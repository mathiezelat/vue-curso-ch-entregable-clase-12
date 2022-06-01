<template>
  <form class="p-5" @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre</label>
      <input
        type="text"
        class="form-control"
        id="nombre"
        v-model.trim="$v.form.nombre.$model"
      />
      <div v-if="$v.form.nombre.$dirty">
        <small class="text-danger" v-if="!$v.form.nombre.required">Nombre es requerido</small>
        <small class="text-danger" v-if="!$v.form.nombre.minLength">
          Nombre tiene que tener al menos {{ $v.form.nombre.$params.minLength.min }} caracteres
        </small>
        <small class="text-danger" v-if="!$v.form.nombre.alpha">Nombre no puede contener números</small>
      </div>
    </div>
    <div class="mb-3">
      <label for="apellido" class="form-label">Apellido</label>
      <input
        type="text"
        class="form-control"
        id="apellido"
        v-model.trim="$v.form.apellido.$model"
      />
      <div v-if="$v.form.apellido.$dirty">
        <small class="text-danger" v-if="!$v.form.apellido.required">Apellido es requerido</small>
        <small class="text-danger" v-if="!$v.form.apellido.minLength">
          Apellido tiene que tener al menos {{ $v.form.apellido.$params.minLength.min }} caracteres
        </small>
        <small class="text-danger" v-if="!$v.form.apellido.alpha">Apellido no puede contener números</small>
      </div>
    </div>
    <div class="mb-3">
      <label for="edad" class="form-label">Edad</label>
      <input
        type="number"
        class="form-control"
        id="edad"
        v-model.trim="$v.form.edad.$model"
      />
      <div v-if="$v.form.edad.$dirty">
        <small class="text-danger" v-if="!$v.form.edad.required">Edad es requerido</small>
        <small class="text-danger" v-if="!$v.form.edad.between">Edad tiene que ser mayor a 18</small>
        <small class="text-danger" v-if="!$v.form.edad.integer">Edad tiene que ser un número entero</small>
      </div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Correo electrónico</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model.trim="$v.form.email.$model"
      />
      <div v-if="$v.form.email.$dirty">
        <small class="text-danger" v-if="!$v.form.email.required">Correo electrónico es requerido</small>
        <small class="text-danger" v-if="!$v.form.email.email">Correo electrónico es inválido</small>
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="pais"> Pais </label>
      <select class="form-select" id="pais" v-model="$v.form.pais.$model">
        <option v-for="pais in listaPaises" :key="pais">
          {{ pais }}
        </option>
      </select>
      <div v-if="$v.form.pais.$dirty">
        <small class="text-danger" v-if="!$v.form.pais.required">Pais es requerido</small>
      </div>
    </div>
    <h4>Selecciona tus cursos</h4>
    <div class="col col-2 mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="javascript"
          id="javascript"
          v-model="$v.form.cursos.$model"
        />
        <label class="form-check-label" for="javascript"> JavaScript </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="react"
          id="react"
          v-model="$v.form.cursos.$model"
        />
        <label class="form-check-label" for="react"> React </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="node.js"
          id="node.js"
          v-model="$v.form.cursos.$model"
        />
        <label class="form-check-label" for="node.js"> Node.js </label>
      </div>
      <div v-if="$v.form.cursos.$dirty">
        <small class="text-danger" v-if="!$v.form.cursos.required">Cursos es requerido</small>
      </div>
    </div>
    <div class="mb-3">
      <p class="text-danger fw-bold" v-if="errorSubmit">
        Error al enviar el formulario
      </p>
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
  </form>
</template>

<script>
import {
  required,
  minLength,
  between,
  email,
  integer,
  alpha,
} from "vuelidate/lib/validators";
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: "FormularioRegistro",
  data() {
    return {
      form: {
        nombre: "",
        apellido: "",
        edad: "",
        email: "",
        pais: "",
        cursos: [],
      },
      listaPaises: ["Argentina", "Uruguay", "Chile", "Brazil", "Otro"],
      errorSubmit: false,
      apiUrl: process.env.VUE_APP_API_URL_USERS
    };
  },
  validations: {
    form: {
      nombre: {
        required,
        alpha,
        minLength: minLength(2),
      },
      apellido: {
        required,
        alpha,
        minLength: minLength(2),
      },
      edad: {
        required,
        integer,
        between: between(18, 100),
      },
      email: {
        required,
        email,
      },
      pais: {
        required,
      },
      cursos: {
        required,
      },
    },
  },
  methods: {
    capitalize(value) {
      return value.replace(/\b\w/g, (l) => l.toUpperCase());
    },
    resetForm() {
      Object.keys(this.form).forEach((key) => (this.form[key] = ""));
      this.form.cursos = [];
    },
    async submitForm() {
      try {
        this.$v.$touch()
        if(this.$v.$invalid) {
          this.errorSubmit = true
        } else {
          this.errorSubmit = false

          const user = {
            nombre: this.capitalize(this.form.nombre),
            apellido: this.capitalize(this.form.apellido),
            edad: this.form.edad,
            email: this.form.email.toLowerCase(),
            pais: this.form.pais,
            cursos: this.form.cursos,
          }

          await axios.post(this.apiUrl, user)

          this.setUser(user)

          this.$v.$reset()
          this.resetForm()
      }
      } catch (error) {
        console.error(error)
      }
    },
    ...mapActions('users', ['setUser'])
  },
};
</script>

<style>
</style>