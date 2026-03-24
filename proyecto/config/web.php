<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'language' => 'es-Es',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],

    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'SR0_BnKkgdjdh5V7w27y5G92Lcv2916l',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser', // <--- ESTA LÍNEA ES VITAL
            ]
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
            'enableSession'   => false,
            'loginUrl'        => null
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            // send all mails to a file by default.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,

        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'showScriptName' => false,
            'rules' => [
                ['class' => 'yii\rest\UrlRule', 'controller' => 'mundos'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'mundos',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET total' => 'total',
                    ],
                ],

                ['class' => 'yii\web\UrlRule', 'pattern' => 'mundos/buscar/<text:.*>', 'route' => 'mundos/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'mundos/total/<text:.*>', 'route' => 'mundos/total'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'mundos',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET buscar/{text}' => 'buscar',
                        'GET total/{text}'  => 'total'
                    ],
                ],

                // ----------------------------------------------
                ['class' => 'yii\rest\UrlRule', 'controller' => 'jugadores'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'jugadores',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET total' => 'total',
                    ],
                ],

                ['class' => 'yii\web\UrlRule', 'pattern' => 'jugadores/buscar/<text:.*>', 'route' => 'jugadores/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'jugadores/total/<text:.*>', 'route' => 'jugadores/total'],
                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'jugadores',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET buscar/{text}' => 'buscar',
                        'GET total/{text}'  => 'total'
                    ],
                ],

                // ----------------------------------------------
                ['class' => 'yii\rest\UrlRule', 'controller' => 'items'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'items',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET total' => 'total',
                    ],
                ],

                ['class' => 'yii\web\UrlRule', 'pattern' => 'items/buscar/<text:.*>', 'route' => 'items/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'items/total/<text:.*>', 'route' => 'items/total'],
                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'items',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET buscar/{text}' => 'buscar',
                        'GET total/{text}'  => 'total'
                    ],
                ],

                // ----------------------------------------------

                ['class' => 'yii\rest\UrlRule', 'controller' => 'biomas'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'biomas',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET total' => 'total',
                    ],
                ],

                ['class' => 'yii\web\UrlRule', 'pattern' => 'biomas/buscar/<text:.*>', 'route' => 'biomas/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'biomas/total/<text:.*>', 'route' => 'biomas/total'],
                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'biomas',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET buscar/{text}' => 'buscar',
                        'GET total/{text}'  => 'total'
                    ],
                ],


                // ----------------------------------------------
                ['class' => 'yii\rest\UrlRule', 'controller' => 'mobs'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'mobs',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET total' => 'total',
                    ],
                ],

                ['class' => 'yii\web\UrlRule', 'pattern' => 'mobs/buscar/<text:.*>', 'route' => 'mobs/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'mobs/total/<text:.*>', 'route' => 'mobs/total'],
                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'mobs',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET buscar/{text}' => 'buscar',
                        'GET total/{text}'  => 'total'
                    ],
                ],

                // ----------------------------------------------
                ['class' => 'yii\rest\UrlRule', 'controller' => 'inventarios'],

                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'inventarios',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET total' => 'total',
                    ],
                ],

                ['class' => 'yii\web\UrlRule', 'pattern' => 'inventarios/buscar/<text:.*>', 'route' => 'inventarios/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'inventarios/total/<text:.*>', 'route' => 'inventarios/total'],
                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'inventarios',
                    'tokens' => [
                        '{id}'   => '<id:\\d[\\d,]*>',
                        '{text}' => '<text:\\w+>'
                    ],
                    'extraPatterns' => [
                        'GET buscar/{text}' => 'buscar',
                        'GET total/{text}'  => 'total'
                    ],
                ],

                // ----------------------------------------------
                ['class' => 'yii\rest\UrlRule', 'controller' => 'jugadores-mundos']
            ],
        ],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
