import styles from '@/styles/Admin.module.css'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SetPermissions({ currentUser, users, handleSave, hideSaveButton }) {

    const [value, setValue] = React.useState('');

    React.useEffect(() => { hideSaveButton && setValue('') }, [hideSaveButton])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <FormControl sx={{ direction: 'rtl' }} onClick={e => e.stopPropagation()}>
                <RadioGroup
                    value={value}
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
                        currentUser !== '' &&
                        <FormControlLabel
                            value=""
                            control={<Radio size="small" />}
                            label={`${currentUser !== '' && `הסר את ${currentUser} ללא בחירה במחליף`}`}
                        />
                    }
                </RadioGroup>
            </FormControl>
            {
                !hideSaveButton &&
                <div
                    className={styles.savePermissions}
                    onClick={() => { handleSave(value, currentUser) }}
                >
                    עדכון הרשאות
                </div>
            }
        </>
    );
}
