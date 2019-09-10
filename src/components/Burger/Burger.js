import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients}) => {
    let transFormIngredients = Object.keys(ingredients).map((ingredient) =>
            { 
                console.log([...Array(ingredients[ingredient])]);
                return [...Array(ingredients[ingredient])].map((_,i)=>{
                    return  <BurgerIngredient key = {ingredient+i} type={ingredient} />
                })
            }).reduce((arr,el)=>{return arr.concat(el)},[]);

    if(transFormIngredients.length === 0) {
        transFormIngredients = <p>Please start adding ingredients !</p>
    }
    console.log(transFormIngredients);

    // const transFormIngredients = Object.keys(ingredients).map((ingredient) => {
    //     console.log([...Array(ingredients[ingredient])]);
    //     return [ingredient,ingredients[ingredient]];
    // }).map((item)=>{
    //     const count = item[1];
    //     let temp = [];
    //     for (let i=0;i<count;i++){
    //        temp.push(<BurgerIngredient key= {item[0]+(i+1)} type={item[0]} />);
    //     }
    //     return temp;
    // });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transFormIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;