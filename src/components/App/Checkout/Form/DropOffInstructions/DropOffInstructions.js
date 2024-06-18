import React, {useState} from 'react';

function DropOffInstructions(){
    const [text, setText] = useState('');

    const handleText = (e) => {
        setText(e.target.value);
    }

    return(
        <fieldset className='instructions-container'>
            <label className='form-title'>
                Drop-off Instructions
            </label>
            <textarea 
                placeholder='Enter Instructions'
                rows='15'
                cols='40'
                name='dropOffInstructions'
                value={text}
                onChange={handleText}
            />
        </fieldset>
    )
}

export default DropOffInstructions;