<template>
      <div>
        <br>
        <br>
        <div class="container">
            <div class="d-flex justify-content-center">
              <div class="card animated fadeInDown">
                  <div class="card-header" style="background-color:#FFD700;">
                    <h2 style="text-align:center; color:black;">
                      <i class="fas fa-tools"></i>
                      <i class="fas fa-plus-circle"></i>
                       Nuevo Arreglo
                     </h2>
                  </div>
                  <hr style="color:black;">
                  <div class="card-body">
                    <p v-if="errors.length">
                      <ul  class="list-group" v-for="error in errors">
                          <li class="alert alert-danger" style="width:700px; margin:0 auto;" role="alert">
                            {{ error }}
                          </li>
                          <br>
                      </ul>
                    </p>
                    <form @submit.prevent="nuevoArreglo()" style="margin: 0 auto; margin-top:20px; width: 680px;">
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Cliente</span>
                                </div>
                                <model-list-select class="form-control" :list="cliente"
                                                   v-model="arreglo.cliente"
                                                   option-value="id_cliente"
                                                   :custom-text="textoCliente"
                                                   :class="{ 'is-invalid': submitted && $v.arreglo.cliente.$error }"
                                                   >
                                </model-list-select>
                                <div v-if="submitted && !$v.arreglo.cliente.required.$error" class="invalid-feedback">
                                  <span v-if="!$v.arreglo.cliente.required">El Cliente no puede ser vacio</span>
                               </div>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend" style="border-right: 5px solid white">
                                    <span class="input-group-text">Producto</span>
                                </div>
                                <model-list-select class="form-control" :list="producto"
                                                   v-model="arreglo.producto"
                                                   option-value="id_producto"
                                                   :custom-text="textoProducto"
                                                   :class="{ 'is-invalid': submitted && $v.arreglo.producto.$error }"
                                                   >
                                </model-list-select>
                                 <div v-if="submitted && !$v.arreglo.producto.required.$error" class="invalid-feedback">
                                  <span v-if="!$v.arreglo.producto.required">El Producto no puede ser vacio</span>
                               </div>
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                  <span class="input-group-text">Observacion</span>
                                </div>
                                <textarea type="text" v-model="arreglo.observacion" class="form-control" placeholder="Ingrese Observacion" :class="{ 'is-invalid': submitted && $v.arreglo.observacion.$error }"></textarea>
                                 <div v-if="submitted && !$v.arreglo.observacion.required.$error" class="invalid-feedback">
                                  <span v-if="!$v.arreglo.observacion.required">La Observacion no puede ser vacia</span>
                               </div>
                            </div>
                            <br>
                            <div class="d-flex justify-content-end">
                                <router-link to="/HomeArreglo" tag="button" class="btn" title="Volver a Home Arreglo" >
                                    <i class="fas fa-arrow-left"></i>
                                        Volver
                                </router-link>
                                <div style="width:2px;"></div>
                                <button type="submit" class="btn" title="Guardar Arreglo">
                                  <i class="far fa-save fa-1x"></i>
                                        Guardar
                                </button>
                            </div>
                    </form>
                  </div>
              </div>
            </div>
       </div>
      </div>
</template>
<script>

import axios from 'axios'
import { ModelSelect } from 'vue-search-select'
import { ModelListSelect } from 'vue-search-select'
import { alertSuccess } from '../../assets/sweetAlert.js'
import Arreglo from '../../models/Arreglo';
import { required, minLength,maxLength } from "vuelidate/lib/validators";


export default {
  name: 'NuevoArreglo',
  created(){
      this.getCliente();
      this.getProducto();
  },
  data () {
    return {
      cliente:[],
      producto:[],
      submitted: false,
      errors: [],
      arreglo : new Arreglo()
		}
  },
  validations: {
          arreglo: {
                cliente: { 
                  required,
                },
                producto:{
                   required,
                },
                observacion:{
                   required,
                   maxLength: maxLength(200)  
                }
          }
    },
  methods: {
      textoProducto (item) {
        return `${item.modelo} ${item.marca} ${item.precio}`
      },
      textoCliente(item){
        return `${item.dni} ${item.nombre} ${item.apellido}`
      },
      getCliente(){
        axios.get('http://localhost:3000/cliente').then((response) =>{
          this.cliente = response.data;
        });
      },
      getProducto(){
        axios.get('http://localhost:3000/productoReparacion').then(response=>{
          this.producto = response.data;
        });
      },
      nuevoArreglo(){
          this.errors = [];
          var _this = this;
          this.submitted = true;
          this.$v.$touch();
          var _this = this;
          if (this.$v.$invalid) {
              return;
          }
          axios.post('http://localhost:3000/arreglo',
          {
          arreglo: this.arreglo
          },
          { headers: {
            'Content-Type': 'application/json',
          }
          }).then(function(response){
            console.log(response);
            if (response.data == "OK"){
              _this.arreglo = new Arreglo();
              alertSuccess();
              _this.submitted = false;
            }else {
              _this.errors.push(response.data.msg);
            }
          }).catch(error=>{
            console.log(error);
          })
      }
    },
    components: {
      ModelSelect,
      ModelListSelect
    }
}

</script>

<style scoped>

h1, h2 {
  font-weight: normal;
}

.card{
height: auto;
margin-bottom: auto;
width: 1650px;
background-color: #2A363B;
border: 1px solid;
border-radius: 5px;
}

.input-group-prepend span{
width: auto;
background-color: #FFD700;
border:0 !important;
}

.form-control {
    border: 0;
    box-shadow: none;
    background-color: white;
}

.btn{
  margin-left: 2px;
  cursor:pointer;
  display:inline-block;
  float:right;
  width:120px;
  height:40px;
  margin-top:-10px;
  border:none;
  background-color: #FFD700;
  -webkit-transition:.5s;
  transition:.5s;
  border-radius: 5px;
  color: black !important;
}

.btn:hover{
  background-color: white;
  color: black;
}

.input-group-text{
width: auto;
background-color: #FFD700;
border: none;
color:black;
}

input{
  background-color: white;
}

.search{
    min-width: 0 !important;
    width: 25px !important;
    border: none !important;
    margin-left: -3px !important;
    border-left: -3px solid !important;
}

</style>
