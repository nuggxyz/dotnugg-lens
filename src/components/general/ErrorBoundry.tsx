import { t } from '@lingui/macro';
import React, { ErrorInfo } from 'react';
import ReactGA from 'react-ga4';

import lib from '@src/lib';

type ErrorBoundaryState = {
    error: Error | null;
};

const IS_PRODUCTION = window.location.hostname === 'app.nugg.xyz';

export default class ErrorBoundary extends React.Component<
    React.PropsWithChildren<unknown>,
    ErrorBoundaryState
> {
    constructor(props: React.PropsWithChildren<unknown>) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // console.log({ error, errorInfo });
        ReactGA.event('exception', {
            description: error.toString() + errorInfo.toString(),
            fatal: true,
        });
    }

    render() {
        const { error } = this.state;

        if (error !== null) {
            const encodedBody = encodeURIComponent(issueBody(error));
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'center',
                        zIndex: 1,
                    }}
                >
                    <div style={{ padding: '1rem', width: '100%', whiteSpace: undefined }}>
                        <div style={{ display: 'grid', gridAutoRows: 'auto', gridRowGap: '12px' }}>
                            <div style={{ padding: '6px 24px' }}> {t`Something went wrong`}</div>
                            <div
                                style={{
                                    background: lib.colors.background,
                                    color: lib.colors.primaryColor,
                                    overflow: 'auto',
                                    whiteSpace: 'pre',
                                    boxShadow:
                                        '0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01)',
                                    borderRadius: '24px',
                                    padding: '18px 24px',
                                }}
                            >
                                <code>{error.stack}</code>
                            </div>
                            {IS_PRODUCTION ? (
                                <div style={{ display: 'flex' }}>
                                    <div style={{ padding: '6px 24px' }}>
                                        <a
                                            rel="noreferrer"
                                            id="create-github-issue-link"
                                            href={`https://github.com/nuggxyz/nuggft-interface/issues/new?assignees=&labels=bug&body=${encodedBody}&title=${encodeURIComponent(
                                                `Crash report: \`${error.name}${
                                                    error.message && `: ${error.message}`
                                                }\``,
                                            )}`}
                                            target="_blank"
                                        >
                                            {t`Create an issue on GitHub`}
                                            <span>↗</span>
                                        </a>
                                    </div>
                                    <div style={{ padding: '6px 24px' }}>
                                        <a
                                            rel="noreferrer"
                                            id="get-support-on-discord"
                                            href="https://www.nugg.xyz"
                                            target="_blank"
                                        >
                                            {t`Get support on Discord`}
                                            <span>↗</span>
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            );
        }
        // eslint-disable-next-line react/destructuring-assignment
        return this.props.children;
    }
}

// function getRelevantState(): ClientState | null {
//     const path = window.location.hash;
//     if (!path.startsWith('#/')) {
//         return null;
//     }

//     return client.core.getState();
// }

function issueBody(error: Error): string {
    const relevantState = {};
    const deviceData = lib.userAgent;
    // prettier-ignore
    return `
        ## URL ${window.location.href}

        ${relevantState ? `
            ## \`all\` state
            \`\`\`json
                ${JSON.stringify(relevantState, null, 2)}
            \`\`\`
        ` : ''}

        ${error.name && `
            ## Error
            \`\`\`
                ${error.name}${error.message && `: ${error.message}`}
            \`\`\`
        `}

        ${error.stack ? `
            ## Stacktrace
            \`\`\`
                ${error.stack}
            \`\`\`
        `: ''}

        ${deviceData && `
            ## Device data
            \`\`\`json
                ${JSON.stringify(deviceData, null, 2)}
            \`\`\`
        `}
    `;
}
