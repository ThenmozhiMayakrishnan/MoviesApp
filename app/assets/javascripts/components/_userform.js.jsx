var UserForm = React.createClass({
	getInitialState() {
		return {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	},
	createInputField(name, type, placeholder) {
		type = type || "text";
		return (<div key={name}><div key={name+type}>{name}</div><input type={type} name={name} value={this.state[name]} onChange={this.inputHandler} placeholder={placeholder}/></div>);
	},
	createUserPasswdField(form) {
		form.push(this.createInputField('email', 'text', 'Enter email'));
		form.push(this.createInputField('password', 'password', 'Enter password'));
		return form;
	},
	createSignin() {
		var form = [];
		form = this.createUserPasswdField(form);
		form.push(<button onClick={this.login}>Signin</button>);
		return form;
	},
	createRegister() {
		var form = [];
		form.push(this.createInputField('name', 'text', 'Enter name'));
		form = this.createUserPasswdField(form);
		form.push(this.createInputField('confirmPassword', 'password', 'Enter password'));
		form.push(<button onClick={this.registerUser}>Register</button>);
		return form;
	},
	inputHandler(event) {
		event.preventDefault();
		var formObj = {};
		formObj[event.target.name] = event.target.value;
		this.setState(formObj);
	},
	login() {
		if(!this.state.email.length) {
			alert('Email cannot be blank');
			return;
		} else if(!this.state.password.length) {
			alert('Password cannot be blank');
			return;
		}
		var successCallback = function(response) {
			if(response.status && response.status === 400) {
				alert(response.message);
				return;
			}
			delete response.message;
			setUserCookie(response);
		};
		var data = {
			email: this.state.email,
			password: btoa(this.state.password)
		};
		sendRequest("/users/login", 'POST', data, successCallback);
	},
	registerUser() {
		if(this.state.password !== this.state.confirmPassword) {
			alert('Password field mismatch');
			this.setState({password: '',confirmPassword: ''});
			return;
		};
		var successCallback = function(response) {
			alert('Successfully registered');
			delete response.message;
			setUserCookie(response);
		};
		var data = this.state;
		delete data.confirmPassword;
		data.password = btoa(data.password);
		sendRequest("/users/registeruser", 'POST', {user: data}, successCallback);
	},
	render() {
		if(this.props.signin) {
			var form = this.createSignin();
		} else {
			var form = this.createRegister();
		}
		var el = (<div><a href="/users/register">Create Account</a>&nbsp;<a href="/users/signin">Signin</a></div>);
		form.push(el);
		return <div>{form}</div>
	}
});