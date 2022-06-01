<template>
  <div class="ps-5">
    <div v-if="getUsers.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">Correo electrónico</th>
            <th scope="col">País</th>
            <th scope="col">Cursos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in getUsers" :key="user.email">
            <td>{{user.nombre}}</td>
            <td>{{user.apellido}}</td>
            <td>{{user.edad}}</td>
            <td>{{user.email}}</td>
            <td>{{user.pais}}</td>
            <td>{{user.cursos.join(', ')}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="alert alert-danger" role="alert" v-else>
        No hay usuarios
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TableRegistro',
    async created() {
      await this.setUsers();
    },
    methods: {
      ...mapActions('users', ['setUsers'])
    },
    computed: {
      ...mapGetters('users', ['getUsers'])
    }
}
</script>

<style>

</style>