import styles from "./FiltersBox.module.scss";
import Slider from '@mui/material/Slider';

export function FiltersBox({priceRange, setPriceRange, fetchData}) {
    const handleChange = (event: Event, newValue: number[]) => {
        setPriceRange(newValue);
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
                        backgroundColor: '#b5b5b5',
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
            />

            <button className={styles.button} onClick={fetchData}> Apply Filters </button>
        </div>
    );
}