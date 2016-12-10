// @flow
export default function (router: Object) {
  router.get('*', async (ctx) => {
    ctx.body = await ctx.render('application/index.marko');
  });
}
