import React, {useState} from 'react';

function DropOffOption() {
    const [option, setOption] = useState('hand it to me');

    const handleOption = (e) => {
        setOption(e.target.value);
    }

    return(
        <fieldset className='radioButtons'>
            <label className='form-title'>
                Drop-Off Options
            </label>
            <input 
                type='radio' 
                name='dropOffOption' 
                id='handItToMe' 
                value='hand it to me' 
                checked={option === 'hand it to me'}
                onChange={handleOption}
                />
            <label for='handItToMe'>
                Hand it to me
            </label>
            <input 
                type='radio'
                name='dropOffOption' 
                id='leaveItAtMyDoor' 
                value='leave it at my door' 
                checked={option === 'leave it at my door'}
                onChange={handleOption}
                />
            <label for='leaveItAtMyDoor'>
                Leave it at my door
            </label>
        </fieldset>
    )
}

export default DropOffOption;