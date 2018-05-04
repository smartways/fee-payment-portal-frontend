export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
      // badge: {
      //   variant: 'primary',
      //   text: 'NEW'
      // }
    },
    {
      name: 'Schools',
      url: '/schools',
      icon: 'fa-university',
      children: [
        {
          name: 'School Panel',
          url: '/schools/schools',
          icon: 'icon-university'
        }
        // {
        //   name: 'Active schools',
        //   url: '/schools/active-schools',
        //   icon: 'icon-star'
        // }
      ]
    },
    {
      name: 'Students',
      url: '/students',
      icon: 'icon-user',
      children: [
        {
          name: 'Student Panel',
          url: '/students/students',
          icon: 'icon-user'
        }
      ]
    },
    {
      name: 'Parents',
      url: '/parents',
      icon: 'icon-user',
      children: [
        {
          name: 'Parents Panel',
          url: '/parents/parents',
          icon: 'icon-user'
        }
      ]
    },
    {
      name: 'Banks',
      url: '/banks',
      icon: 'icon-building',
      children: [
        {
          name: 'Bank Panel',
          url: '/banks/banks',
          icon: 'fa-building-o'
        }
      ]
    },
    {
      name: 'Payments',
      url: '/payments',
      icon: 'fa fa-dollar',
      children: [
        {
          name: 'Payment Panel',
          url: '/payments/payments',
          icon: 'fa fa-dollar'
        }
      ]
    },
    {
      name: 'User Management',
      url: '/users',
      icon: 'fa fa-users',
      children: [
        {
          name: 'User Panel',
          url: '/users/user-list',
          icon: 'icon-user'
        }
      ]
    }
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'primary',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart'
    // },
    // {
    //   divider: true
    // },
    // {
    //   title: true,
    //   name: 'Extras'
    // },
    // {
    //   name: 'Download CoreUI',
    //   url: 'http://coreui.io/vue/',
    //   icon: 'icon-cloud-download',
    //   class: 'mt-auto',
    //   variant: 'success'
    // },
    // {
    //   name: 'Try CoreUI PRO',
    //   url: 'http://coreui.io/pro/vue/',
    //   icon: 'icon-layers',
    //   variant: 'danger'
    // }
  ]
}
