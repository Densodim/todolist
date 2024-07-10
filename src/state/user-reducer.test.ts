import {userReducer} from "./user-reducer";

test('user reducer increment only age', ()=>{
    const startState = {age:25, childrenCount: 2, name:'Ivan'}

    const endState = userReducer(startState, {type: 'INCREMENT_AGE'})

    expect(endState.age).toBe(26);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toBe('Ivan');
});

test('user reducer should be increment only childrenCount', ()=>{
    const startState = {age:25, childrenCount: 2, name:'Ivan'}

    const endState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'})

    expect(endState.age).toBe(25)
    expect(endState.childrenCount).toBe(3)
    expect(endState.name).not.toBe('Dima')
});

test('user reducer should be change name', ()=>{
    //data
    const startState = {age:25, childrenCount: 2, name:'Ivan'}
    const newName = 'Kiril';
    //action
    const endState = userReducer(startState, {type:'CHANGE_NAME', newName:newName});
    //expect
    expect(endState.age).toBe(25);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toBe('Kiril');
})


