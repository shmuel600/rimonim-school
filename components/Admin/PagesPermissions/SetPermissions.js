import styles from '@/styles/Admin.module.css'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SetPermissions({ viewedUser, chosenUser, setChosenUser, users, handleSave, hideSaveButton }) {

    // on accordion close, reset chosen user (so when opened again, default choice will be chosen)
    // React.useEffect(() => { hideSaveButton && setChosenUser('') }, [hideSaveButton, setChosenUser])

    const handleChange = (event) => {
        setChosenUser(event.target.value);
    };

    return (
        <>
            <FormControl sx={{ direction: 'rtl' }} onClick={e => e.stopPropagation()}>
                <RadioGroup
                    value={chosenUser}
                    onChange={handleChange}
                >
                    {
                        users.length > 0 &&
                        users
                            .filter(user => user.permissions === null)
                            .map(user =>
                                <FormControlLabel
                                    key={user._id}
                                    value={user.name}
                                    control={<Radio size="small" />}
                                    label={user.name}
                                />
                            )
                    }
                    {
                        viewedUser !== '' &&
                        <FormControlLabel
                            value=""
                            control={<Radio size="small" />}
                            label={`${viewedUser !== '' && `הסר את ${viewedUser} ללא בחירה במחליף`}`}
                        />
                    }
                </RadioGroup>
            </FormControl>
            {
                !hideSaveButton &&
                <div
                    className={styles.savePermissions}
                    onClick={() => { handleSave(chosenUser, viewedUser) }}
                >
                    עדכון הרשאות
                </div>
            }
        </>
    );
}
