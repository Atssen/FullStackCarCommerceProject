import React from 'react';
import { useSortBy } from 'react-instantsearch';
import styles from "./CardViewSelectors.module.scss";


const SORT_ITEMS = [
    { label: 'Relevance', value: 'cars' },
    { label: 'Price (High to Low)', value: 'cars:price:desc' },
    { label: 'Price (Low to High)', value: 'cars:price:asc' },
    { label: 'Alphabetically', value: 'cars:name:asc' },
];

export function CustomSortByBox() {
    const { currentRefinement, options, refine } = useSortBy({ items: SORT_ITEMS });

    return (
        <div>
            <select
                value={currentRefinement}
                onChange={(event) => refine(event.target.value)}
                className={styles.orderSelection}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}