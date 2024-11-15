import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    usuario_plans: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::usuario-plan.usuario-plan'
    >;
    nombre: Attribute.String;
    apellido: Attribute.String;
    pais_id: Attribute.Integer;
    estado_id: Attribute.Integer;
    localidad_id: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCambioMonedaTiendaCambioMonedaTienda
  extends Schema.CollectionType {
  collectionName: 'cambio_moneda_tiendas';
  info: {
    singularName: 'cambio-moneda-tienda';
    pluralName: 'cambio-moneda-tiendas';
    displayName: 'CambioMonedaTienda';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cambio_usd: Attribute.Decimal;
    tiendas: Attribute.Relation<
      'api::cambio-moneda-tienda.cambio-moneda-tienda',
      'manyToMany',
      'api::shop.shop'
    >;
    moneda: Attribute.Relation<
      'api::cambio-moneda-tienda.cambio-moneda-tienda',
      'oneToOne',
      'api::moneda.moneda'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cambio-moneda-tienda.cambio-moneda-tienda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cambio-moneda-tienda.cambio-moneda-tienda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClasificationProductClasificationProduct
  extends Schema.CollectionType {
  collectionName: 'clasification_products';
  info: {
    singularName: 'clasification-product';
    pluralName: 'clasification-products';
    displayName: 'ClasificacionProductos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    stocks: Attribute.Relation<
      'api::clasification-product.clasification-product',
      'manyToMany',
      'api::stock.stock'
    >;
    descripcion: Attribute.Text;
    tienda: Attribute.Relation<
      'api::clasification-product.clasification-product',
      'oneToOne',
      'api::shop.shop'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::clasification-product.clasification-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::clasification-product.clasification-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassificationStoreClassificationStore
  extends Schema.CollectionType {
  collectionName: 'classification_stores';
  info: {
    singularName: 'classification-store';
    pluralName: 'classification-stores';
    displayName: 'ClasificacionTienda';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    tiendas: Attribute.Relation<
      'api::classification-store.classification-store',
      'manyToMany',
      'api::shop.shop'
    >;
    icono: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::classification-store.classification-store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::classification-store.classification-store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiComentarieComentarie extends Schema.CollectionType {
  collectionName: 'comentaries';
  info: {
    singularName: 'comentarie';
    pluralName: 'comentaries';
    displayName: 'Comentarios';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    descripcion: Attribute.Text & Attribute.Required;
    usuario: Attribute.Relation<
      'api::comentarie.comentarie',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    valoracion: Attribute.Decimal;
    stock: Attribute.Relation<
      'api::comentarie.comentarie',
      'manyToOne',
      'api::stock.stock'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::comentarie.comentarie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::comentarie.comentarie',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactoMediaLunaContactoMediaLuna
  extends Schema.CollectionType {
  collectionName: 'contacto_media_lunas';
  info: {
    singularName: 'contacto-media-luna';
    pluralName: 'contacto-media-lunas';
    displayName: 'Contacto MediaLuna';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    whatsApp: Attribute.String;
    email: Attribute.Email;
    instagram: Attribute.String;
    facebook: Attribute.String;
    x: Attribute.String;
    linkedin: Attribute.String;
    direccion: Attribute.Text;
    ubicacion_url: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contacto-media-luna.contacto-media-luna',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contacto-media-luna.contacto-media-luna',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountryCountry extends Schema.CollectionType {
  collectionName: 'countries';
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Paises';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    estados: Attribute.Relation<
      'api::country.country',
      'oneToMany',
      'api::state.state'
    >;
    slug: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[a-za-z0-9]{8}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[a-za-z0-9]{8}$';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDireccionesUserDireccionesUser
  extends Schema.CollectionType {
  collectionName: 'direcciones_users';
  info: {
    singularName: 'direcciones-user';
    pluralName: 'direcciones-users';
    displayName: 'DireccionesUser';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre_direccion: Attribute.String;
    direccion: Attribute.Text;
    user: Attribute.Relation<
      'api::direcciones-user.direcciones-user',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::direcciones-user.direcciones-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::direcciones-user.direcciones-user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEstadoOrdenEstadoOrden extends Schema.CollectionType {
  collectionName: 'estado_ordens';
  info: {
    singularName: 'estado-orden';
    pluralName: 'estado-ordens';
    displayName: 'EstadoOrden';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String & Attribute.Required;
    descripcion: Attribute.Text & Attribute.Required;
    color: Attribute.String & Attribute.Required;
    tienda: Attribute.Relation<
      'api::estado-orden.estado-orden',
      'oneToOne',
      'api::shop.shop'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::estado-orden.estado-orden',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::estado-orden.estado-orden',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Schema.CollectionType {
  collectionName: 'invoices';
  info: {
    singularName: 'invoice';
    pluralName: 'invoices';
    displayName: 'Facturas';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fecha_pago: Attribute.DateTime & Attribute.Required;
    pagado: Attribute.Float & Attribute.Required;
    usuario: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    fecha_expiracion: Attribute.DateTime & Attribute.Required;
    plan: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'api::plan.plan'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLocalityLocality extends Schema.CollectionType {
  collectionName: 'locations';
  info: {
    singularName: 'locality';
    pluralName: 'locations';
    displayName: 'Localidad';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    estado: Attribute.Relation<
      'api::locality.locality',
      'manyToOne',
      'api::state.state'
    >;
    slug: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[a-za-z0-9]{8}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[a-za-z0-9]{8}$';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::locality.locality',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::locality.locality',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMensajeriaMensajeria extends Schema.CollectionType {
  collectionName: 'mensajerias';
  info: {
    singularName: 'mensajeria';
    pluralName: 'mensajerias';
    displayName: 'Mensajeria';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Nombre: Attribute.String;
    paise: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'oneToOne',
      'api::country.country'
    >;
    estado: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'oneToOne',
      'api::state.state'
    >;
    localidad: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'oneToOne',
      'api::locality.locality'
    >;
    descripcion: Attribute.Text;
    precio: Attribute.Float;
    tienda: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'manyToOne',
      'api::shop.shop'
    >;
    cambio_moneda_tienda: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'oneToOne',
      'api::cambio-moneda-tienda.cambio-moneda-tienda'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mensajeria.mensajeria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMonedaMoneda extends Schema.CollectionType {
  collectionName: 'monedas';
  info: {
    singularName: 'moneda';
    pluralName: 'monedas';
    displayName: 'Moneda';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    simbolo: Attribute.String;
    nombre_completo: Attribute.String;
    slug: Attribute.UID<'api::moneda.moneda', 'nombre'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::moneda.moneda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::moneda.moneda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrdenStockOrdenStock extends Schema.CollectionType {
  collectionName: 'orden_stocks';
  info: {
    singularName: 'orden-stock';
    pluralName: 'orden-stocks';
    displayName: 'OrdenStock';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    stock: Attribute.Relation<
      'api::orden-stock.orden-stock',
      'oneToOne',
      'api::stock.stock'
    >;
    enabled: Attribute.Boolean;
    cantidad: Attribute.Integer;
    moneda: Attribute.String;
    simbolo_moneda: Attribute.String;
    cambio_usd: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::orden-stock.orden-stock',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::orden-stock.orden-stock',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Ordenes';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    productos: Attribute.Relation<
      'api::order.order',
      'oneToMany',
      'api::orden-stock.orden-stock'
    >;
    tienda: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::shop.shop'
    >;
    nombres: Attribute.String & Attribute.Required;
    apellidos: Attribute.String & Attribute.Required;
    CI: Attribute.String & Attribute.Required;
    pais: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::country.country'
    >;
    estado_orden: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::estado-orden.estado-orden'
    >;
    localidad: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::locality.locality'
    >;
    estado: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::state.state'
    >;
    numero_orden: Attribute.String;
    direccion: Attribute.String;
    telefono: Attribute.String;
    precio_mensajeria: Attribute.Float;
    precio_total: Attribute.Float;
    precio_productos: Attribute.Float;
    moneda: Attribute.String;
    user_id: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPlanPlan extends Schema.CollectionType {
  collectionName: 'plans';
  info: {
    singularName: 'plan';
    pluralName: 'plans';
    displayName: 'Planes';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String & Attribute.Required;
    precio: Attribute.Decimal;
    descripcion: Attribute.Text;
    moneda: Attribute.Relation<
      'api::plan.plan',
      'oneToOne',
      'api::moneda.moneda'
    >;
    opciones: Attribute.Relation<
      'api::plan.plan',
      'manyToMany',
      'api::plan-option.plan-option'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::plan.plan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::plan.plan', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPlanOptionPlanOption extends Schema.CollectionType {
  collectionName: 'plan_options';
  info: {
    singularName: 'plan-option';
    pluralName: 'plan-options';
    displayName: 'PlanOpciones';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String & Attribute.Required;
    icono: Attribute.Media & Attribute.Required;
    planes: Attribute.Relation<
      'api::plan-option.plan-option',
      'manyToMany',
      'api::plan.plan'
    >;
    descripcion: Attribute.String;
    slug: Attribute.UID<'api::plan-option.plan-option', 'nombre'> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::plan-option.plan-option',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::plan-option.plan-option',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRetirarGananciasReferidoRetirarGananciasReferido
  extends Schema.CollectionType {
  collectionName: 'retirar_ganancias_referidos';
  info: {
    singularName: 'retirar-ganancias-referido';
    pluralName: 'retirar-ganancias-referidos';
    displayName: 'RetirarGananciasReferido';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cantidad_retiro: Attribute.Decimal;
    numero_tarjeta: Attribute.String;
    numero_telefono: Attribute.String;
    user: Attribute.Relation<
      'api::retirar-ganancias-referido.retirar-ganancias-referido',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    acreditado: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::retirar-ganancias-referido.retirar-ganancias-referido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::retirar-ganancias-referido.retirar-ganancias-referido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShopShop extends Schema.CollectionType {
  collectionName: 'shops';
  info: {
    singularName: 'shop';
    pluralName: 'shops';
    displayName: 'Tiendas';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String & Attribute.Required & Attribute.Unique;
    descripcion: Attribute.Text & Attribute.Required;
    usuario: Attribute.Relation<
      'api::shop.shop',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    pais: Attribute.Relation<
      'api::shop.shop',
      'oneToMany',
      'api::country.country'
    >;
    banner: Attribute.Media;
    logo: Attribute.Media;
    clasificacion_tiendas: Attribute.Relation<
      'api::shop.shop',
      'manyToMany',
      'api::classification-store.classification-store'
    >;
    whatsapp_contact: Attribute.String;
    telegram_contact: Attribute.String;
    instagram_contact: Attribute.String;
    x_contact: Attribute.String;
    phone_contact: Attribute.String;
    site_contact: Attribute.String;
    email_contact: Attribute.String;
    productos: Attribute.Relation<
      'api::shop.shop',
      'oneToMany',
      'api::stock.stock'
    >;
    estados: Attribute.Relation<
      'api::shop.shop',
      'oneToMany',
      'api::state.state'
    >;
    slug: Attribute.UID<'api::shop.shop', 'nombre'>;
    precio_maximo: Attribute.Decimal;
    precio_minimo: Attribute.Decimal;
    mensajerias: Attribute.Relation<
      'api::shop.shop',
      'oneToMany',
      'api::mensajeria.mensajeria'
    >;
    monedas: Attribute.Relation<
      'api::shop.shop',
      'oneToMany',
      'api::moneda.moneda'
    >;
    color_primario: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    cambio_moneda_tiendas: Attribute.Relation<
      'api::shop.shop',
      'manyToMany',
      'api::cambio-moneda-tienda.cambio-moneda-tienda'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiStateState extends Schema.CollectionType {
  collectionName: 'states';
  info: {
    singularName: 'state';
    pluralName: 'states';
    displayName: 'Estados';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    localidads: Attribute.Relation<
      'api::state.state',
      'oneToMany',
      'api::locality.locality'
    >;
    paise: Attribute.Relation<
      'api::state.state',
      'manyToOne',
      'api::country.country'
    >;
    slug: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[a-za-z0-9]{8}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[a-za-z0-9]{8}$';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::state.state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::state.state',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStockStock extends Schema.CollectionType {
  collectionName: 'stocks';
  info: {
    singularName: 'stock';
    pluralName: 'stocks';
    displayName: 'Stock';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String & Attribute.Required;
    foto1: Attribute.Media & Attribute.Required;
    precio: Attribute.Float & Attribute.Required;
    clasificacion_productos: Attribute.Relation<
      'api::stock.stock',
      'manyToMany',
      'api::clasification-product.clasification-product'
    >;
    comentarios: Attribute.Relation<
      'api::stock.stock',
      'oneToMany',
      'api::comentarie.comentarie'
    >;
    foto2: Attribute.Media & Attribute.Required;
    foto3: Attribute.Media & Attribute.Required;
    foto4: Attribute.Media & Attribute.Required;
    cantidad: Attribute.Integer;
    descripcion: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'light';
        }
      >;
    tienda: Attribute.Relation<
      'api::stock.stock',
      'manyToOne',
      'api::shop.shop'
    >;
    descuento_porciento: Attribute.Integer;
    promedioValoracion: Attribute.Decimal;
    pais: Attribute.Relation<
      'api::stock.stock',
      'oneToOne',
      'api::country.country'
    >;
    estado: Attribute.Relation<
      'api::stock.stock',
      'oneToOne',
      'api::state.state'
    >;
    cantidadValoraciones: Attribute.Integer;
    moneda_principal: Attribute.Relation<
      'api::stock.stock',
      'oneToOne',
      'api::cambio-moneda-tienda.cambio-moneda-tienda'
    >;
    cambio_moneda_permitidas: Attribute.Relation<
      'api::stock.stock',
      'oneToMany',
      'api::cambio-moneda-tienda.cambio-moneda-tienda'
    >;
    slug: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[a-za-z0-9]{8}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[a-za-z0-9]{8}$';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stock.stock',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stock.stock',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUsuarioPlanUsuarioPlan extends Schema.CollectionType {
  collectionName: 'usuario_plans';
  info: {
    singularName: 'usuario-plan';
    pluralName: 'usuario-plans';
    displayName: 'UsuarioPlan';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usuario: Attribute.Relation<
      'api::usuario-plan.usuario-plan',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    plan: Attribute.Relation<
      'api::usuario-plan.usuario-plan',
      'oneToOne',
      'api::plan.plan'
    >;
    ultima_factura: Attribute.Relation<
      'api::usuario-plan.usuario-plan',
      'oneToOne',
      'api::invoice.invoice'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::usuario-plan.usuario-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::usuario-plan.usuario-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUsuarioReferidoUsuarioReferido
  extends Schema.CollectionType {
  collectionName: 'usuario_referidos';
  info: {
    singularName: 'usuario-referido';
    pluralName: 'usuario-referidos';
    displayName: 'UsuarioReferido';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    usuario: Attribute.Relation<
      'api::usuario-referido.usuario-referido',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    referidos: Attribute.Relation<
      'api::usuario-referido.usuario-referido',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::usuario-referido.usuario-referido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::usuario-referido.usuario-referido',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiValoracionValoracion extends Schema.CollectionType {
  collectionName: 'valoracions';
  info: {
    singularName: 'valoracion';
    pluralName: 'valoracions';
    displayName: 'Valoracion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    valor: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 5;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::valoracion.valoracion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::valoracion.valoracion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVercificacionEmailVercificacionEmail
  extends Schema.CollectionType {
  collectionName: 'vercificacion_emails';
  info: {
    singularName: 'vercificacion-email';
    pluralName: 'vercificacion-emails';
    displayName: 'VercificacionEmail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: Attribute.Email;
    code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vercificacion-email.vercificacion-email',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vercificacion-email.vercificacion-email',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::cambio-moneda-tienda.cambio-moneda-tienda': ApiCambioMonedaTiendaCambioMonedaTienda;
      'api::clasification-product.clasification-product': ApiClasificationProductClasificationProduct;
      'api::classification-store.classification-store': ApiClassificationStoreClassificationStore;
      'api::comentarie.comentarie': ApiComentarieComentarie;
      'api::contacto-media-luna.contacto-media-luna': ApiContactoMediaLunaContactoMediaLuna;
      'api::country.country': ApiCountryCountry;
      'api::direcciones-user.direcciones-user': ApiDireccionesUserDireccionesUser;
      'api::estado-orden.estado-orden': ApiEstadoOrdenEstadoOrden;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::locality.locality': ApiLocalityLocality;
      'api::mensajeria.mensajeria': ApiMensajeriaMensajeria;
      'api::moneda.moneda': ApiMonedaMoneda;
      'api::orden-stock.orden-stock': ApiOrdenStockOrdenStock;
      'api::order.order': ApiOrderOrder;
      'api::plan.plan': ApiPlanPlan;
      'api::plan-option.plan-option': ApiPlanOptionPlanOption;
      'api::retirar-ganancias-referido.retirar-ganancias-referido': ApiRetirarGananciasReferidoRetirarGananciasReferido;
      'api::shop.shop': ApiShopShop;
      'api::state.state': ApiStateState;
      'api::stock.stock': ApiStockStock;
      'api::usuario-plan.usuario-plan': ApiUsuarioPlanUsuarioPlan;
      'api::usuario-referido.usuario-referido': ApiUsuarioReferidoUsuarioReferido;
      'api::valoracion.valoracion': ApiValoracionValoracion;
      'api::vercificacion-email.vercificacion-email': ApiVercificacionEmailVercificacionEmail;
    }
  }
}
