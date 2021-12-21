import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
    background: #3f51b5;

    color: white;

    display: flex;
    flex-direction; row;
    justify-content: flex-end;
    align-items: center;    
`;

const LinkWrapper = styled.div`
    margin-right: 40px;
`

const StyledA = styled.a`
    font-size: 26px;
`;

const Header = () => {
    return (
        <Wrapper>
            <LinkWrapper>
                <Link href='/'>
                    <StyledA>Home</StyledA>
                </Link>
            </LinkWrapper>
            <LinkWrapper>
                <Link href='/posts/new'>
                    <StyledA>New Post</StyledA>
                </Link>
            </LinkWrapper>
        </Wrapper>
    )
}

export default Header;

// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import rootDomain, { createEvent, createStore, forward, sample } from '@store/root-domain';
// import { createForm, useForm } from 'effector-react-form';
// import { useState } from '@storybook/addons';
// import Input from '@components/ui/inputs/input';
// import { seoCompute, setComputedValuesFn, toggleComputedValuesFn } from '@utils/seo-compute';
// import { useEvent, useStore } from 'effector-react';
// import InputComputable from './input-computable';

// const form = createForm({
//     initialValues: { test: 'Test value' },
//     domain: rootDomain,
// });
// export const setComputableFields = createEvent<Record<string, boolean | undefined | void>>();
// export const toggleComputableField = createEvent<string>();

// export const $computableFields = createStore<Record<string, boolean | undefined | void>>({}).on(form.reset, () => ({}));

// const setLang = createEvent<string>();

// const $lang = createStore<string>('ru').on(setLang, (_, newLang) => newLang);

// sample({
//     source: { computableFields: $computableFields },
//     clock: form.onChangeFieldBrowser,
//     fn: ({ computableFields }, event) => ({ [event.name]: false }),
//     target: setComputableFields,
// });

// sample({
//     source: { computableFields: $computableFields },
//     clock: setComputableFields,
//     fn: setComputedValuesFn,
//     target: $computableFields,
// });

// sample({
//     source: { computableFields: $computableFields },
//     clock: toggleComputableField,
//     fn: toggleComputedValuesFn,
//     target: $computableFields,
// });

// sample({
//     source: { values: form.$values, lang: $lang, computableFields: $computableFields },
//     clock: [$computableFields.updates, form.onChangeFieldBrowser, $lang.updates],
//     fn: (source, _) => {
//         return seoCompute(source, 'key');
//     },
//     target: form.$values,
// });

// const stories = storiesOf('inputs/input-computable', module).addParameters({
//     layout: 'centered',
// });

// const locales = ['en', 'ru'];

// // @ts-ignore
// stories.add('default', () => {
//     const { controller } = useForm({ form });
//     const lang = useStore($lang);
//     const computableFields = useStore($computableFields);

//     const events = useEvent({ toggleComputableField, setLang });

//     return (
//         <div>
//             {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//         {locales.map((item) => (
//           <Button
//             type="button"
//             key={item}
//             onClick={() => events.setLang(item)}
//             style={{ borderColor: item === lang ? '#0071d2' : 'inherit' }}
//           >
//             {item}
//           </Button>
//         ))}
//       </div> */}
//             <br />
//             <Input controller={controller({ name: `localizeInfos.${lang}.key` })} />
//             <br />
//             <InputComputable
//                 controller={controller({ name: `localizeInfos.${lang}.seoVariant` })}
//                 inputSourceName="Story"
//                 activeCompute={computableFields[`localizeInfos.${lang}.seoVariant`]}
//                 onClickComputeTrigger={() => toggleComputableField(`localizeInfos.${lang}.seoVariant`)}
//             />
//         </div>
//     );
// });
