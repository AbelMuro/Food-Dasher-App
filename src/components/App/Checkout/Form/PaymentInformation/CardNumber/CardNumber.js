import React, {useState} from 'react';

function CardNumber(){
    const [number, setNumber] = useState('');

    const handleNumber = (e) => {
        const formatCard = e.target.value.replaceAll(' ', '');                         
        let temp = '';

        if(formatCard.match(/\D/g) || formatCard.length > 16)
            return;

        for(let i = 0; i < formatCard.length; i++){
            if(i % 4 === 0)                                      
                temp += ` ${formatCard[i]}`;
            else
                temp += formatCard[i];
        }
        setNumber(temp);
    }

    return(
        <div className='cardNumber'>
            <label className='cardLabel'>
                Card Number
            </label>
            <input 
                type='tel' 
                name='cardNumber'
                inputmode='numeric' 
                placeholder='xxxx xxxx xxxx xxxx'
                pattern='[0-9/s]{19}' 
                autoComplete='cc-nnumber'
                value={number}
                onChange={handleNumber}
                className='cardInput'
                />
        </div>
    )
}

export default CardNumber;