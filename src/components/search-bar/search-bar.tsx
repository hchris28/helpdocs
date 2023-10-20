import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql, navigate, Link } from "gatsby"
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { useReadLocalStorage, useOnClickOutside } from 'usehooks-ts'
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from 'usehooks-ts'
import SearchIcon from '../icons/search-icon'
import CloseIcon from '../icons/close-icon'
import classNames from 'classnames'
import * as styles from "./search-bar.module.scss"

const charSearchMin = 3;

interface FuseResult {
    item: SearchIndexItem;
    refIndex: number;
}

const SearchBar: React.FC = () => {

    const data = useStaticQuery(graphql`
        query Search {
            fusejs {
                index
                data
            }
        }
    `);

    const searchWindowRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const user = useReadLocalStorage<User>('user');
    const [searchText, setSearchText] = useState<string>("");
    const debouncedSearchText = useDebounce(searchText, 150);
    const [searching, setSearching] = useState<boolean>(false);
    const results: FuseResult[] = useGatsbyPluginFusejs(debouncedSearchText, data.fusejs);
    
    const activateSearch = () => {
        setSearching(true);
        searchInputRef.current?.focus();
        document.body.style.overflow = 'hidden';
    };

    const deactivateSearch = () => {
        setSearchText("");
        setSearching(false);
        searchInputRef.current?.blur();
        document.body.style.overflow = 'auto';
    };

    // Handle keyboard events, close search window when user presses escape
    // and focus on search input when user presses CTRL + forward slash
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                deactivateSearch();
            }
            if (e.key === '/' && e.ctrlKey) {
                e.preventDefault();
                activateSearch();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Close search window when user clicks outside of search window
    useOnClickOutside(searchWindowRef, deactivateSearch);

    return (
        <div className={styles.searchWindow} ref={searchWindowRef}>
            <motion.div
                layout
                transition={{ duration: 0.2 }}
                className={classNames(styles.searchInputContainer, { [styles.searching]: searching })}
            >
                <motion.div
                    layout
                    className={styles.searchIconContainer}
                    onClick={activateSearch}
                >
                    <SearchIcon className={styles.searchIcon} />
                </motion.div>
                <motion.input
                    layout
                    ref={searchInputRef}
                    className={styles.searchInput}
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={activateSearch}
                />
                {!searching && (
                    <motion.div
                        layout
                        className={styles.searchLabel}
                        onClick={activateSearch}
                    >
                        CTRL + /
                    </motion.div>
                )}
                {searching && (
                    <button className={styles.clearButton} onClick={deactivateSearch}>
                        <CloseIcon className={styles.closeIcon} />
                    </button>
                )}
            </motion.div>
            <AnimatePresence>
                {searching && (
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
                        {searching && debouncedSearchText.length <= charSearchMin && (
                            <div className={styles.noResults}>
                                <p>Start typing to search...</p>
                                <p>
                                    {charSearchMin + 1} or more characters required to search.
                                    <br />
                                    Click the "x" or press the escape key to close this window.
                                </p>

                            </div>
                        )}
                        {results.map(({ item: { slug, title, excerpt, breadcrumbs } }: FuseResult) => (
                            <motion.div
                                layout
                                key={slug}
                                className={styles.searchResultItem}
                                onClick={() => navigate(`/${slug}`)}
                            >
                                <div className={styles.searchResultHeader}>
                                    <Link to={`/${slug}`} className={styles.searchResultTitle}>{title}</Link>
                                    {breadcrumbs.length > 0 && (
                                        <div className={styles.searchResultBreadcrumbs}>
                                            {breadcrumbs.map((item, index) => {
                                                return (
                                                    <span className={styles.searchResultBreadcrumb} key={index}>
                                                        <Link to={`/${item.slug}`}>{item.title}</Link>
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                                <p className={styles.searchResultExcerpt}>{excerpt}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchBar