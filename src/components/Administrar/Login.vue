<template>
  <div id="login">
    <div class="container">
      	<div class="d-flex justify-content-center animated fadeIn">
      		<div class="card" id="carta">
        			<div class="card-header">
                <img src="../../assets/LogoTelnovo.png" class="input-group form-group" >
        			</div>
        			<div class="card-body">
            				<form @submit.prevent="login()">
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-user"></i></span>
              						</div>
              						<input required type="email" v-model="usuario" class="form-control" placeholder="Ingrese Usuario">
            					</div>
            					<div class="input-group form-group">
              						<div class="input-group-prepend">
              							<span class="input-group-text"><i class="fas fa-key"></i></span>
              						</div>
              						<input required type="password" v-model="password" class="form-control" placeholder="Ingrese Password">
            					</div>
                      <div class="form-group">
                          <button type="submit" class="btn float-right btn-warning" title="Login">
                                <i class="fas fa-sign-in-alt fa-1x"></i>
                                Login
                          </button>
            					</div>
                    </form>
        			</div>
        			<div class="card-footer">
            				<div class="d-flex justify-content-center links">
                      <div class="form-group">
                          <div class="d-flex justify-content-end social_icon">
                    					<span><i class="fab fa-facebook-square" v-on:click="loginFacebook()"></i></span>
                    					<span><i class="fab fa-google-plus-square" v-on:click="loginGoogle()"></i></span>
                  				</div>
                      </div>
            				</div>
        			</div>
      		</div>
          <br>
      	</div>
      </div>
  <br>
  </div>
</template>
<script>

import axios from 'axios'
import firebase from 'firebase'
import {mapMutations} from 'vuex'

export default {
  created(){

  },
  data () {
    return {
      usuario: '',
      password: ''

		}
  },
  mounted(){

  },
  methods: {
    login(){
        if (this.usuario && this.password){
            firebase.auth().signInWithEmailAndPassword(this.usuario,this.password)
            .then((user)=>{
              this.$router.replace('/Home');
            })
            .catch((error)=>{
                console.log(error);
                this.$swal( 'Error!','Usuario y Password Incorrecta','error');
            });
        }else{
          this.$swal( 'Error!','Completa los Campos Vacios','error');
        }
    },
    loginGoogle(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    },
    loginFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    },




}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Numans');
#login{
  background-color: #2A363B;
  background-size: cover;
  background-repeat: no-repeat;
  height: 110%;
  font-family: 'Numans', sans-serif;
}
.container{
 height: 110%;
align-content: center

}

#carta{
background-color:black;
color:white;
}

.btn{
  background-color: #FFC312;
  color:black;
}
.card{
height: 30%;
margin-top: 42px;
margin-bottom: auto;
width: 60%;
border-radius: 5px;
}
.card-header h3{
color: white;

}
.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}
input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;
}
.login_btn{
color: #FFC312;
width: 100px;
}
.login_btn:hover{
color: black;
background-color: white;
}
.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}
.social_icon span:hover{
color: white;
cursor: pointer;
}

</style>
