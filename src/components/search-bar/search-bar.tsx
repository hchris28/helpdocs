import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import { useReadLocalStorage, useOnClickOutside } from 'usehooks-ts'
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from 'usehooks-ts'
import SearchIcon from '../icons/search-icon'
import CloseIcon from '../icons/close-icon'
import * as styles from "./search-bar.module.scss"

/* 
    NOTE: This component is using a naive search algorithm. It is not optimized for performance. 
    If you have a large number of documents, you may want to consider using a search library.
*/

const charSearchMin = 3;

type SearchResult = {
    fields: {
        company: string
        slug: string
    }
    frontmatter: {
        title: string
    }
    body: string
    excerpt: string
};

const SearchBar: React.FC = () => {

    const data = useStaticQuery(graphql`
        query SearchQuery {
            allMdx(sort: { frontmatter: { order: ASC }}) {
                nodes {
                    fields {
                        company
                        slug
                    }
                    frontmatter {
                        title
                    }
                    body
                    excerpt
                }
            }
        }
    `)

    const searchWindowRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const companyName = useReadLocalStorage('company');
    const [searchText, setSearchText] = useState<string>("");
    const debouncedSearchText = useDebounce(searchText, 150);
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if (debouncedSearchText.length > charSearchMin) {
            setResults(data.allMdx.nodes
                .filter(({ fields: { company }, frontmatter: { title }, body }: SearchResult) => {
                    return company === companyName && (
                        title.toLowerCase().includes(debouncedSearchText.toLowerCase())
                        || body.toLowerCase().includes(debouncedSearchText.toLowerCase())
                    );
                }));
        } else {
            setResults([]);
        }
    }, [debouncedSearchText, companyName, data.allMdx.nodes]);

    // Handle keyboard events, close search window when user presses escape
    // and focus on search input when user presses CTRL + forward slash
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSearchText("");
            }
            if (e.key === '/' && e.ctrlKey) {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Close search window when user clicks outside of search window
    useOnClickOutside(searchWindowRef, () => setSearchText(""))

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchWindow} ref={searchWindowRef}>
                <div className={styles.searchInputContainer}>
                    <SearchIcon className={styles.searchIcon} />
                    <input
                        ref={searchInputRef}
                        className={styles.searchInput}
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="CTRL + / to search"
                    />
                    {debouncedSearchText && (
                        <button className={styles.clearButton} onClick={() => setSearchText("")}>
                            <CloseIcon className={styles.closeIcon} />
                        </button>
                    )}
                </div>
                <AnimatePresence>
                    {debouncedSearchText && (
                        <motion.div
                            key="search-results"
                            className={styles.searchResultsContainer}
                            initial={{ y: -242, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
                            exit={{ y: -242, opacity: 0, transition: { duration: 0.2 } }}
                        >
                            {debouncedSearchText.length > charSearchMin && results.length === 0 && (
                                <div className={styles.noResults}>No results found for `{debouncedSearchText}`</div>
                            )}
                            {debouncedSearchText.length > 0 && debouncedSearchText.length <= charSearchMin && (
                                <div className={styles.noResults}>Please enter at least {charSearchMin + 1} characters</div>
                            )}
                                {results.map(({ fields: { slug }, frontmatter: { title }, excerpt }: SearchResult) => (
                                    <div 
                                        key={slug} 
                                        className={styles.searchResultItem}
                                    >
                                        <Link to={`/${slug}`} className={styles.searchResultTitle}>
                                            {title}
                                        </Link>
                                        <p className={styles.searchResultExcerpt}>{excerpt}</p>
                                    </div>
                                ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default SearchBar