import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: {
            light: {
                primary: colors.blue.darken2,
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3
            }
        }
    },
    icons: {
        iconfont: "mdi"
    }
}

export default new Vuetify(
    opts
);