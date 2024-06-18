import React, {useState} from 'react';

function ZipCode() {
    const [zip, setZip] = useState('');

    const handleZip = (e) => {
        const input = e.target.value;
        if(input.match(/\D/g) || input.length > 5)
            return;
        setZip(input);
    }

    return(
        <div className='zipCode'>
            <label className='cardLabel'>
                Zip Code
            </label>
            <input 
                type='text' 
                name='zip'
                placeholder='ZIP'
                className='cardInput' 
                value={zip}
                onChange={handleZip}/>
        </div>
    )
}

export default ZipCode;