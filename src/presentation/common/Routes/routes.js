
const routes = {
  INITIAL: "/",
  SIGNUP: "/signup",
  DASHBOARD :"/dashboard",
  STUDENTLIST :"/userlist",
  FACULTYLIST :"/facultylist",
  CALENDER : "/calender",
  NOTIFICATION : "/notification",
  COURSE : "/course",
  BLOG : '/blog',
  BLOGEXPANDED : '/blogExpanded',
  WEBINAR:`/webinar`,
  CATEGORY:`/category`,
  EXPERTS:`/experts`,
  SERVICE:`/service`,
  REVIEW:'/review',
  REPORT:`/reports`,
  SUBSCRIPTION:"/subscription",
  ADMIN:"/admin"

};

// Change initial route if required
routes.LOGIN = routes.INITIAL;

export { routes };
