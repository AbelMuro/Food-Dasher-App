import React, {useState} from 'react';

function ExpirationDate() {
    const [exp, setExp] = useState('');

    const handleExp = (e) => {
        let cleanedText = e.target.value.replace('/', '');

        if(cleanedText.match(/\D/g))
            return;

        let formattedText = cleanedText;
        if(cleanedText.length > 2)
            formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, cleanedText.length)}`;
        setExp(formattedText );
    }

    return(
        <div className='expirationDate'>
            <label className='cardLabel'>
                Expiration
            </label>
            <input 
                className='cardInput' 
                type='text' 
                name='expirationDate'
                value={exp} 
                onChange={handleExp}
                placeholder='MM/YY'
                />
        </div>
    )
}

export default ExpirationDate;