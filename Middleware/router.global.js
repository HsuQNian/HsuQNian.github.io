export default defineNuxtRouteMiddleware((to, from) => {
  console.time("全局前置钩子执行了");
  useRouter().afterEach(() => {
    console.timeEnd("全局前置钩子执行了");
  });
});
