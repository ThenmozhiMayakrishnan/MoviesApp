/*Common send request method*/
var sendRequest = function(url, action, data, callback) {
	$.ajax({ 
		url: url, 
		type: action,
		data: data,
		success: (response) => {
			callback(response);
		},
		error: (error) => {
			alert(error);
		}
	});
};
var setUserCookie = function(response, stayOnPage) {
	response = JSON.stringify(response);
	var date = new Date();
	date.setTime(date.getTime() + (5 * 60 * 1000));  
	document.cookie = "authentication="+response+"; expires="+ date.toUTCString()+ "; path=/movies;";
	document.cookie = "authentication="+response+"; expires="+ date.toUTCString()+ "; path=/users;";
	document.cookie = "authentication="+response+"; expires="+ date.toUTCString()+ "; path=/;";
	if(window.cookieTime) {
		clearTimeout(window.cookieTime);
	}
	window.cookieTime = setTimeout(function(){ 
		userDetails.setUser();
		userDetails.setCart();
	}, (5 * 60 * 1000));
	if(!stayOnPage) {
		window.location.href = "/";
	}
};
var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
var signIn = function() {
	window.location.href = "/users/signin";
};
/*Closure to cart quantity*/
var userDetails = (function() {
	var cart = 0;
	var user = undefined;
	var authentication = getCookie("authentication");
	if(authentication.length) {
		user = JSON.parse(authentication);
		cart = user.cartQuantity;
	}
  	var setCart = function(newCart) {
    	cart = newCart || 0;
  	};
  	var setUser = function(newUser) {
  		user = newUser;
  	};
  	return {
    	setCart: function(val) {
      		setCart(val);
    	},
    	setUser: function(val) {
      		setUser(val);
    	},
    	increment: function(val) {
    		setCart(cart + val);
    	},
    	getCart: function() {
      		return cart;
    	},
    	getUser: function() {
      		return user;
    	}
  	};   
})();
var goToCart = function() {
	var user = userDetails.getUser();
	if(user) {
		window.location.href= "/users/"+user.id+"/cart"
	} else {
		alert("Signin to see the cart");
		signIn();
	}
};
var signOut = function() {
	var date = new Date();
	date.setTime(date.getTime() - (60 * 1000));  
	document.cookie = "authentication=; expires="+ date.toUTCString()+ "; path=/movies;";
	document.cookie = "authentication=; expires="+ date.toUTCString()+ "; path=/users;";
	document.cookie = "authentication=; expires="+ date.toUTCString()+ "; path=/;";
	if(window.cookieTime) {
		clearTimeout(window.cookieTime);
	}
	userDetails.setUser();
	userDetails.setCart();
	alert("Logged out successfully");
}
var Header = React.createClass({
	getInitialState() {
		return {
			cartQuantity : userDetails.getCart(),
			user: userDetails.getUser()
		}
	},
	signOut() {
		signOut();
		this.setState({user: undefined});
	},
	render() {
		var userProfile;
		if(this.state.user) {
			userProfile = (<div><button onClick={this.signOut}>Sign out</button>{this.state.user.username}</div>)
		} else {
			userProfile = <button onClick={signIn}>Signin</button>
		}
		return <div>
			<button onClick={goToCart}>Cart {this.state.cartQuantity}</button>
			{userProfile}
		</div>
	}
});