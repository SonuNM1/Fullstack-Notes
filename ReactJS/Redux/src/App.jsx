
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './redux/counter/counterSlice';

function App() {

  const dispatch = useDispatch() ; 
  const count = useSelector((state) => state.counter.value)

  return (
    <>
      <div>
        <button onClick={() => dispatch(decrement())} >-</button>
        Counter: {count}
        <button onClick={() => dispatch(increment())} >+</button>
      </div>
    </>
  )
}

export default App
