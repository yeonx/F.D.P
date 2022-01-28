import Vue from 'vue';
import VueRouter from 'vue-router';
import Student from '../components/Student.vue';
import Professor from '../components/Professor.vue';
import EnterRoom from '../components/EnterRoom.vue';
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: EnterRoom,
      name:'EnterRoom'
    },
    {
      path: '/student',
      component: Student,
      name:'Student',
      props:true
    },
    {
      path: '/professor',
      component: Professor,
      name:'Professor',
      props:true
    },
  ]
})