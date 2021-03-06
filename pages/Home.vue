<template>
  <div id="home">
    <SfHero
      class="hero"
      :slider-options="{
        animationDuration: 2000,
        rewindDuration: 2000
      }"
    >
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="i"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>

    <SfBannerGrid :banner-grid="1" class="banner-grid">
      <template v-for="(banner, i) in banners" #[banner.slot]>
        <router-link :key="i" :to="banner.link">
          <SfBanner
            :subtitle="banner.subtitle"
            :title="banner.title"
            :description="banner.description"
            :button-text="banner.buttonText"
            :image="banner.image"
            :class="banner.className"
          />
        </router-link>
      </template>
    </SfBannerGrid>

    <SfSection :title-heading="$t('Bestsellers')" class="section">
      <lazy-hydrate :trigger-hydration="!loading">
        <m-product-carousel :products="newCollection" />
      </lazy-hydrate>
    </SfSection>

    <ONewsletter />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LazyHydrate from 'vue-lazy-hydration';
import { Logger } from '@vue-storefront/core/lib/logger';
import { isServer, onlineHelper } from '@vue-storefront/core/helpers';
import MProductCarousel from 'theme/components/molecules/m-product-carousel';
import ONewsletter from 'theme/components/organisms/o-newsletter';
import AImagesGrid from 'theme/components/atoms/a-images-grid';
import { checkWebpSupport } from 'theme/helpers'
// import SfHero from 'theme/comps/SfHero/SfHero';
// import SfSection from 'theme/comps/SfSection/SfSection';
// import SfBannerGrid from 'theme/comps/SfBannerGrid/SfBannerGrid';
// import SfBanner from 'theme/comps/SfBanner/SfBanner';


import {
  SfHero,
  SfSection,
  SfBannerGrid,
  SfBanner
} from '@storefront-ui/vue';

export default {
  name: 'Home',
  components: {
    LazyHydrate,
    SfHero,
    SfSection,
    SfBannerGrid,
    SfBanner,
    MProductCarousel,
    ONewsletter,
    AImagesGrid
  },
  data () {
    return {
      loading: true,
      loadNewsletterPopup: false
    };
  },
  computed: {
    ...mapState({
      isWebpSupported: state => state.ui.isWebpSupported
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      heroImages: 'promoted/getHeadImage',
      promotedOffers: 'promoted/getPromotedOffers',
      newCollection: 'homepage/getEverythingNewCollection',
      dummyInstagramImages: 'instagram/getInstagramImages'
    }),
    isOnline () {
      return onlineHelper.isOnline;
    },
    banners () {
      return checkWebpSupport(this.promotedOffers.mainBanners, this.isWebpSupported)
    },
    heroes () {
      return checkWebpSupport(this.heroImages, this.isWebpSupported)
    },
    instagramImages () {
      return checkWebpSupport(this.dummyInstagramImages, this.isWebpSupported)
    }
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect');
      if (redirectObj) this.$router.push(redirectObj);
      localStorage.removeItem('redirect');
    }
  },
  async asyncData ({ store, context }) {
    Logger.info('Calling asyncData in Home (theme)')();
    if (context) context.output.cacheTags.add(`home`)

    await Promise.all([
      store.dispatch('homepage/fetchNewCollection'),
      store.dispatch('promoted/updateHeadImage'),
      store.dispatch('instagram/updateInstagramImages')
    ]);
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) { this.$bus.$emit('modal-show', 'modal-signup'); }
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) {
      next(vm => {
        vm.$store.dispatch('homepage/fetchNewCollection').then(() => {
          vm.loading = false;
        });
      });
    } else {
      next();
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$i18n.t('Home Page'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0 var(--spacer-sm);
    max-width: 1272px;
    margin: 0 auto;
  }
}
.sf-hero-item {
  --hero-item-height: 14rem;
  height: initial;
  --hero-item-subtitle-font-size: 1rem;
}
.sf-hero-item .sf-banner {
  text-shadow: 0 2px #fff, 2px 2px #fff, 3px 3px #fff;
}
.sf-hero {
  &-active {
    --bullet-background: #dab3ab;
  }
}
.valkone {
  --hero-item-title-color: white;
  --hero-item-subtitle-color: white;
  --banner-title-color: white;
  --banner-subtitle-color: white;
  --banner-description-color: white;
  text-shadow: 0 1px #000, 1px 1px #000;
}
.sf-banner {
  --banner-subtitle-font-size: 1rem;
}
.sf-bullet--active {
  --bullet-background: #dab3ab;
}
// .kont {
//   --banner-background-position: 100% 100%;
//   --banner-background-size: cover;
// }
// .sf-hero-item__title {
//   --hero-item-title-color: white;
// }

.banner-grid {
  margin: var(--spacer-base) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
  }
}
</style>
