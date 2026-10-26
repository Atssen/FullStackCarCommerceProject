import { SetStateAction, useRef, useState} from 'react';
import {useSearchBox} from 'react-instantsearch';
import styles from './CustomSearchBox.module.scss';


// @ts-expect-error idk
export default function CustomSearchBox(props) {
    const {query, refine} = useSearchBox(props);
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef(null);

    function setQuery(newQuery: SetStateAction<string>) {
        setInputValue(newQuery);
        if (typeof newQuery === "string") {
            refine(newQuery);
        }
    }

    return (
        <div className="relative">
            <form
                action=""
                role="search"
                noValidate
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // if (inputRef.current) {
                    //     inputRef.current.blur();
                    // }
                }}
                onReset={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuery('');
                    // if (inputRef.current) {
                    //     inputRef.current.focus();
                    // }
                }}
            >
                {/* Search Icon */}
                <span className="hidden pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                {/* Custom Input */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    maxLength={512}
                    value={inputValue}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    className={`${styles.box} rounded-[0.2vw] text-sm transition outline-none text-white p-[0.5vw] bg-black`}
                />

                {/* Clear Button */}
                {inputValue && (
                    <button
                        type="reset"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </form>
        </div>
    );
}