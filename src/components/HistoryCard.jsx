import React from 'react'
import { BiCheckCircle, BiXCircle, BiHelpCircle } from 'react-icons/bi';

import './style/HistoryCard.css'

export const HistoryCard = ({ data }) => {
    const {
        dates: {
            start,
            end
        },
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        vegetalC,
        checkpoint
    } = data,
        currentWeek = (new Date() >= new Date(start) && new Date() <= new Date(end))
    return (
        <div className='card-style'>
            <h3>Semana: {start} al {end}</h3>
            {currentWeek && <p>semana actual</p>}

            {monday
                ? <>{
                    monday.length > 1
                        ? !monday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}

            {tuesday
                ? <>{
                    tuesday.length > 1
                        ? !tuesday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}

            {wednesday
                ? <>{
                    wednesday.length > 1
                        ? !wednesday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}

            {thursday
                ? <>{
                    thursday.length > 1
                        ? !thursday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}

            {friday
                ? <>{
                    friday.length > 1
                        ? !friday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}

            {saturday
                ? <>{
                    saturday.length > 1
                        ? !saturday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}

            {sunday
                ? <>{
                    sunday.length > 1
                        ? !sunday[2]
                            ? <BiCheckCircle className='icon i-margin i-green' />
                            : <BiXCircle className='icon i-margin i-red' />
                        : <BiHelpCircle className='icon i-margin i-grey' />}
                </>
                : <BiHelpCircle className='icon i-margin i-grey' />}


            <p>Vegetales C: {vegetalC}</p>
            {checkpoint && <>
                <p>Peso: </p>
                <p>% musculo: </p>
                <p>% grasa: </p>
            </>}
        </div>
    )
}
