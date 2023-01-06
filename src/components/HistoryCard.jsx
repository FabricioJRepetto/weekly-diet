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
        <div className={`history-card-container card-style`}>
            <p>Semana: <b>{start.slice(0, -5)}</b>{currentWeek && ' (semana actual)'}</p>


            <div className='history-card-days'>
                <div>L
                    {monday
                        ? <>{
                            monday.length > 1
                                ? !monday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>

                <div>M
                    {tuesday
                        ? <>{
                            tuesday.length > 1
                                ? !tuesday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>

                <div>X
                    {wednesday
                        ? <>{
                            wednesday.length > 1
                                ? !wednesday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>

                <div>J
                    {thursday
                        ? <>{
                            thursday.length > 1
                                ? !thursday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>

                <div>V
                    {friday
                        ? <>{
                            friday.length > 1
                                ? !friday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>

                <div>S
                    {saturday
                        ? <>{
                            saturday.length > 1
                                ? !saturday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>

                <div>D
                    {sunday
                        ? <>{
                            sunday.length > 1
                                ? !sunday[2]
                                    ? <BiCheckCircle className='icon i-green' />
                                    : <BiXCircle className='icon i-red' />
                                : <BiHelpCircle className='icon i-grey' />}
                        </>
                        : <BiHelpCircle className='icon i-grey' />}
                </div>
            </div>


            <p>Vegetales C: {vegetalC}</p>
            {checkpoint && <>
                <p>Peso: </p>
                <p>% musculo: </p>
                <p>% grasa: </p>
            </>}
        </div>
    )
}
