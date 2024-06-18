import React, {useState} from 'react';

function CVC() {
    const [cvc, setCvc] = useState('');

    const handleCvc = (e) => {
        const input = e.target.value;

        if(input.match(/\D/g) || input.length > 3)
            return;

        setCvc(input);
    }

    return(
        <div className='cvc'>
            <label className='cardLabel'>
                CVC
            </label>
            <input 
                type='text' 
                name='cvc'
                className='cardInput'
                placeholder='CVC'
                value={cvc}
                onChange={handleCvc}
                />
        </div>
    )
}

export default CVC;