import React, {useEffect, useState} from 'react';
import axios from "axios";
import { createRoot } from 'react-dom/client'
import { useBoundStore } from './store/index';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

// import { useBoundStore } from 'store';

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


    const testZ = useBoundStore((store) => store.bears)
    const addBearFunction = useBoundStore((store) => store.addBear)
        return (
            <div>
                {tempState &&
                    tempState.map(pet => {
                        console.log(pet)
                        return(
                            <div>
                                <p className='bg-red-500 text-2xl border border-black'>{pet.id}</p>
                                <p className='bg-green-500 text-lg text-white'>{pet.breed}</p>
                                <p>{testZ}</p>
                                <button onClick={addBearFunction}>CLICK</button>
                            </div>
                        )

                        }
                    )}
                test52
            </div>
        );
}

createRoot(document.getElementById('root')!).render(<App />)
