import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
function App() {
    const [tempState, setTempState] = useState<any[]>()

    useEffect(() => {
        axios.get('/api/pet_store/index').then(
            e => {
                setTempState(e.data)
                console.log(e)
            }
        )
    },[])


        return (
            <div>
                {tempState &&
                    tempState.map(pet => {
                        console.log(pet)
                        return(
                            <div>
                                <p className='bg-red-500 text-2xl border border-black'>{pet.id}</p>
                                <p className='bg-green-500 text-lg text-white'>{pet.breed}</p>
                            </div>
                        )

                        }
                    )}
                test52
            </div>
        );
}

createRoot(document.getElementById('root')!).render(<App />)
