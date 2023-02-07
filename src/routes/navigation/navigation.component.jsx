import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import CardIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    

    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <Logo className="logo" />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    {currentUser ? <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> : <Link className="nav-link" to="/auth">SIGN IN</Link>}
                    <CardIcon />
                </div>
                {
                    isCartOpen && <CartDropdown />
                }
                
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;