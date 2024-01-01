import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store'; 
import { createRouter, createWebHistory } from 'vue-router'
import Game from './view/GameView.vue'
import Login from './view/LoginView.vue'
import Register from './view/RegisterView.vue'

const app = createApp(App);
app.use(store);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            component: Game,
        },
        {
            path: '/login', 
            component: Login,
            beforeEnter: (to, from, next) => {
                if (store.state.isUserLoggedIn) {
                    next('/'); // Redirect logged-in users to home
                } else {
                    next(); // Proceed for non-logged in users
                }
            }
        },
        {
            path: '/register', 
            component: Register,
            beforeEnter: (to, from, next) => {
                if (store.state.isUserLoggedIn) {
                    next('/'); // Redirect logged-in users to home
                } else {
                    next(); // Proceed for non-logged in users
                }
            }
        },
    ]
})

app.use(router);
app.mount('#app');
