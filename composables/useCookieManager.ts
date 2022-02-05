import { isUndefined } from 'lodash';
import { CookieRef } from 'nuxt3/dist/app/composables/cookie';

export const useCookieManager = () => {
    const { COOKIE_NAME } = useRuntimeConfig();

    const cookie = <CookieRef<{}>>useCookie(COOKIE_NAME, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        path: '/',
    });

    const onSetCookie = (value: string, options: any) => cookie.value = {
        ...cookie.value, ...{ [value]: options }
    }

    const onGetCookie = (value: string) => {
        if (!cookie.value) return null;

        return cookie.value[value] ?? null;
    };

    const onRemoveCookie = (value: string) => {
        if (isUndefined(cookie.value[value])) return;

        delete cookie.value[value];

        cookie.value = { ...cookie.value };

    }

    const onClearCookie = () => cookie.value = {};

    return {
        onSetCookie,
        onGetCookie,
        onRemoveCookie,
        onClearCookie,
    }
}