<template lang="pug">
.home
  .block
    .hero.is-dark
      .hero-body 
        p.title CTF Stats Page
        p Hello, welcome to the new CTF stats page. I wish I had cool content to put on this webpage but I don't yet. Check back in a #soon or two.

  .block
    .container.is-fluid
      .content
        h3 Questions You Might Have(tm)

        .block
          p
            strong How often do the player stats get updated?
          p Every day at midnight (EST)
        
        .block
          p
            strong What happened to the old site?
          p Well, it's been completely redone. I used to use Google Firebase and Github Pages, but those weren't as flexible as I would have preferred.
          | The old process to update stats also used to be having my laptop calculate everything overnight and hoping nothing broke, so really cumbersome.
        
        .block
          p
            strong What's special about this one?
          p It auto-updates itself, and runs on Amazon AWS, so I can do a lot more cool things with it. Your data is also now downloaded in seconds instead of minutes.
</template>

<script>

export default { 
  name: "Home",
  components: { },
  mounted(){
    document.title = "Home | CTF Stats"
  } 
};
</script>

<style lang="scss" scoped>
  // .home {
  //   background: url('../assets/dots1.png');
  //   background-size: cover;
  // }
</style>
