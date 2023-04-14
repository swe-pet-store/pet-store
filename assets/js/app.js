import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';

function App() {
    const [tempState, setTempState] = useState()

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
                    tempState.map((pet,i) => {
                        return(
                            <div>
                                <p className='bg-red-500 text-2xl border border-black'>{tempState[i].name}</p>
                                <p className='bg-green-500 text-lg text-white'>{tempState[i].breed}</p>
                            </div>
                        )

                        }
                    )}
                test53
            </div>
        );
}

ReactDOM.render(<App/>, document.getElementById('root' ));