/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    /* ============================================================
     * Clean Architecture Rules
     * ============================================================ */
    {
      name: 'domain-cannot-depend-on-application',
      severity: 'error',
      comment:
        'Domain layer should not depend on Application layer. ' +
        'Domain entities must remain pure business logic without dependencies on use cases.',
      from: {
        path: '^src/domain',
      },
      to: {
        path: '^src/application',
      },
    },
    {
      name: 'domain-cannot-depend-on-infrastructure',
      severity: 'error',
      comment:
        'Domain layer should not depend on Infrastructure layer. ' +
        'Domain must not know about database, external services, or technical implementations.',
      from: {
        path: '^src/domain',
      },
      to: {
        path: '^src/infrastructure',
      },
    },
    {
      name: 'domain-cannot-depend-on-presentation',
      severity: 'error',
      comment:
        'Domain layer should not depend on Presentation layer. ' +
        'Domain must not know about HTTP, controllers, or DTOs.',
      from: {
        path: '^src/domain',
      },
      to: {
        path: '^src/presentation',
      },
    },
    {
      name: 'application-cannot-depend-on-infrastructure',
      severity: 'error',
      comment:
        'Application layer should not depend on Infrastructure layer implementations. ' +
        'Use cases should depend on repository interfaces, not concrete implementations.',
      from: {
        path: '^src/application',
      },
      to: {
        path: '^src/infrastructure',
      },
    },
    {
      name: 'application-cannot-depend-on-framework',
      severity: 'error',
      comment:
        'Application layer must be framework-agnostic. ' +
        'Use cases cannot depend on framework libraries like NestJS, Express, etc.',
      from: {
        path: '^src/application',
      },
      to: {
        path: '(^node_modules/@nestjs|^node_modules/express|^node_modules/fastify)',
      },
    },
    {
      name: 'application-cannot-depend-on-presentation',
      severity: 'error',
      comment:
        'Application layer should not depend on Presentation layer. ' +
        'Use cases should not know about HTTP, controllers, or DTOs.',
      from: {
        path: '^src/application',
      },
      to: {
        path: '^src/presentation',
      },
    },
    {
      name: 'presentation-cannot-depend-on-infrastructure',
      severity: 'error',
      comment:
        'Presentation layer should not depend on Infrastructure layer directly. ' +
        'Controllers should only use use cases and DTOs, not repositories or database implementations.',
      from: {
        path: '^src/presentation',
      },
      to: {
        path: '^src/infrastructure',
      },
    },

    /* ============================================================
     * General Best Practices
     * ============================================================ */
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'This dependency is part of a circular relationship. You might want to revise ' +
        'your solution (i.e. use dependency inversion, make sure the modules have a single responsibility)',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-orphans',
      comment:
        "This is an orphan module - it's likely not used (anymore?). Either use it or " +
        'remove it. If it\'s logical this module is an orphan (i.e. it\'s a config file), ' +
        'add an exception for it in your dependency-cruiser configuration.',
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/)[.][^/]+[.](js|cjs|mjs|ts|json)$', // dot files
          '[.]d[.]ts$', // TypeScript declaration files
          '(^|/)tsconfig[.]json$', // TypeScript config
          '(^|/)(babel|webpack)[.]config[.](js|cjs|mjs|ts|json)$', // babel/webpack configs
          'src/main[.]ts$', // main entry point
          'test/', // test files
          '[.]spec[.]ts$', // spec files
          '[.]e2e-spec[.]ts$', // e2e test files
        ],
      },
      to: {},
    },
    {
      name: 'no-deprecated-core',
      comment:
        'A module depends on a node core module that has been deprecated. Find an alternative - these are ' +
        "bound to exist - node doesn't deprecate lightly.",
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['core'],
        path: [
          '^(v8/tools/codemap|v8/tools/consarray)$',
          '^(v8/tools/csvparser|v8/tools/logreader)$',
          '^(v8/tools/profile_view|v8/tools/profile)$',
          '^(v8/tools/SourceMap|v8/tools/splaytree)$',
          '^(v8/tools/tickprocessor-driver|v8/tools/tickprocessor)$',
          '^(node-inspect/lib/_inspect|node-inspect/lib/internal/inspect_client)$',
          '^(node-inspect/lib/internal/inspect_repl|async_hooks)$',
          '^(punycode|domain|constants|sys|_linklist|_stream_wrap)$',
        ],
      },
    },
    {
      name: 'not-to-deprecated',
      comment:
        'This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later ' +
        'version of that module, or find an alternative. Deprecated modules are a security risk.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['deprecated'],
      },
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment:
        "This module depends on an npm package that isn't in the 'dependencies' section of your package.json. " +
        "That's problematic as the package either (1) won't be available on live (2 - worse) will be " +
        'available on live with an non-guaranteed version. Fix it by adding the package to the dependencies ' +
        'in your package.json.',
      from: {},
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown'],
      },
    },
    {
      name: 'not-to-unresolvable',
      comment:
        "This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
        'module: add it to your package.json. In all other cases you likely already know what to do.',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: 'no-duplicate-dep-types',
      comment:
        "Likely this module depends on an external ('npm') package that occurs more than once " +
        'in your package.json i.e. both as a devDependencies and in dependencies. This will cause ' +
        'maintenance problems later on.',
      severity: 'warn',
      from: {},
      to: {
        moreThanOneDependencyType: true,
        // as it's pretty common to have a type import be a type only import
        // _and_ (e.g.) a devDependency - don't consider type-only dependency
        // types for this rule
        dependencyTypesNot: ['type-only'],
      },
    },
    {
      name: 'not-to-spec',
      comment:
        'This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. ' +
        "If there's something in a spec that's of use to other modules, it doesn't have that single " +
        'responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.',
      severity: 'error',
      from: {
        pathNot: '[.]spec[.]ts$',
      },
      to: {
        path: '[.]spec[.]ts$',
      },
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment:
        "This module depends on an npm package from the 'devDependencies' section of your " +
        'package.json. It looks like something that ships to production, though. To prevent problems ' +
        "with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
        'section of your package.json. If this module is development only - add it to the ' +
        'from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration',
      from: {
        path: '^(src)',
        pathNot: '[.]spec[.]ts$',
      },
      to: {
        dependencyTypes: ['npm-dev'],
        pathNot: [
          'node_modules/@types/',
        ],
      },
    },
    {
      name: 'optional-deps-used',
      severity: 'info',
      comment:
        "This module depends on an npm package that is declared as an optional dependency " +
        "in your package.json. As this makes sense in limited situations only, it's flagged here. " +
        "If you're using an optional dependency here by design - add an exception to your" +
        'dependency-cruiser configuration.',
      from: {},
      to: {
        dependencyTypes: ['npm-optional'],
      },
    },
    {
      name: 'peer-deps-used',
      comment:
        "This module depends on an npm package that is declared as a peer dependency " +
        'in your package.json. This makes sense if your package is e.g. a plugin, but in ' +
        'other cases - maybe not so much. If the use of a peer dependency is intentional ' +
        'add an exception to your dependency-cruiser configuration.',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: ['npm-peer'],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(@[^/]+/[^/]+|[^/]+)',
      },
      archi: {
        collapsePattern: '^(src/domain|src/application|src/infrastructure|src/presentation)',
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
