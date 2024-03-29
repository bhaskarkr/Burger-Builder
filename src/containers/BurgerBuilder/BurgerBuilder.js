import React from 'react';
import Aux from './../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum,el)=>{
                        return sum + el;
                    },0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type] + this.state.totalPrice ;
        this.setState({
            totalPrice: priceAddition,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;
        const priceDeduction = - INGREDIENT_PRICES[type] + this.state.totalPrice ;
        this.setState({
            totalPrice: priceDeduction,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue');
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                                  price={this.state.totalPrice}
                                  purchaseCanceled={this.purchaseCancelHandler}
                                  purchaseContinued={this.purchaseContinueHandler}
                                  tot />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded ={this.addIngredientHandler} 
                                ingredientRemoved = {this.removeIngredientHandler} 
                                disabled = {disableInfo}
                                purchasable={this.state.purchasable}
                                price={this.state.totalPrice}
                                ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;