import styles from "./FiltersBox.module.scss";
import Slider from '@mui/material/Slider';
import {Dispatch, SetStateAction} from "react";
import {OrderFactors} from "@/src/enums/orderFactors";

type FiltersBoxProps = {
    priceRange : number[];
    setPriceRange : (priceRange : number[]) => void;
    fetchData : () => Promise<void>;
}

const minDistance = 10000;

export function FiltersBox({priceRange, setPriceRange, fetchData} : FiltersBoxProps) {

    const handleChange = (event: Event, newValue: number[], activeThumb: number) => {
        if (activeThumb === 0) {
            setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
        } else {
            setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
        }
    };

    return (
        <div className={styles.box}>
            <Slider
                sx={{
                    color: '#ffffff', // thumb + track
                    '& .MuiSlider-thumb': {
                        '&:hover': {
                            boxShadow: '0 0 0 5px rgba(255,255,255,0.1)', // hover circle
                        },
                        '&.Mui-active': {
                            boxShadow: '0 0 0 5px rgba(255,255,255,0.2)', // click circle
                        },
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: '#ffffff',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#373737',
                    },
                }}
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) =>
                    `$ ${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
                }
                min={10000}
                max={100000}
                step={10000}
                disableSwap
            />

            <p> ${priceRange[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}  -  ${priceRange[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>

            <button className={styles.button} onClick={fetchData}> Apply Filters </button>
        </div>
    );
}