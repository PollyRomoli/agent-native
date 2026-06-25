---
title: "Formularios"
description: "Creador de formularios nativo del agente: cree, edite, publique y enrute envíos de formularios a través de lenguaje natural más un editor visual."
---

# Formularios

Forms es un creador de formularios nativo del agente. Describe el formulario que deseas, refinelo en el editor y publica un formulario público que almacene los envíos en tu propia base de datos SQL.

```an-wireframe
{
  "surface": "desktop",
  "html": "<div style='display:flex;flex-direction:column;min-height:520px;box-sizing:border-box'><div style='display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1.4px solid var(--wf-line)'><strong>Registro beta</strong><span class='wf-pill accent'>published</span><div style='flex:1'></div><button>Compartir</button><button class='primary'>Anular publicación</button></div><div style='display:flex;gap:8px;padding:12px 16px;border-bottom:1.4px solid var(--wf-line)'><span class='wf-pill accent'>Editar</span><span class='wf-pill'>Resultados 187</span><span class='wf-pill'>Configuración</span><span class='wf-pill'>Integraciones</span></div><div style='display:flex;flex-direction:column;gap:12px;padding:30px 78px;overflow:hidden'><h2 style='margin:0'>Registro beta</h2><p class='wf-muted' style='margin:0'>Reserve a spot in the upcoming private beta cohort.</p><div class='wf-card'><strong>Nombre completo</strong><input value='Ada Lovelace'/></div><div class='wf-card'><strong>Correo de trabajo</strong><input value='you@company.com'/></div><div class='wf-card'><strong>Tu rol</strong><input value='Select...'/></div><div class='wf-card'><strong>Tamaño del equipo</strong><input value='Select...'/></div></div></div>"
}
```

Cuando abres la aplicación, ves tus formularios, el editor actual y una vista previa en vivo. El agente puede crear un formulario a partir de un mensaje, actualizar etiquetas y opciones de campo, cambiar la validación y conectar destinos de envío utilizando el mismo actions que utiliza el UI.

```an-diagram title="Construir, publicar, recopilar" summary="El agente y el editor visual editan una definición de formulario SQL-backed. La página de llenado pública no está autenticada y los envíos se dirigen del lado del servidor a sus destinos."
{
  "html": "<div class=\"diagram-flow\"><div class=\"diagram-col\"><div class=\"diagram-node\">Agent prompt<br><small class=\"diagram-muted\">\"add an NPS question\"</small></div><div class=\"diagram-node\">Visual editor<br><small class=\"diagram-muted\">labels, validation, order</small></div></div><div class=\"diagram-arrow diagram-muted\" aria-hidden=\"true\">&rarr;</div><div class=\"diagram-panel center\"><span class=\"diagram-pill accent\">create-form · update-form</span><small class=\"diagram-muted\">fields JSON, settings JSON</small></div><div class=\"diagram-arrow diagram-muted\" aria-hidden=\"true\">&rarr;</div><div class=\"diagram-box\">forms table<br><small class=\"diagram-muted\">SQL via Drizzle</small></div><div class=\"diagram-arrow diagram-muted\" aria-hidden=\"true\">&rarr;</div><div class=\"diagram-col\"><div class=\"diagram-box\">Public fill page<br><small class=\"diagram-muted\">unauthenticated</small></div><div class=\"diagram-box\">responses<br><small class=\"diagram-muted\">+ Slack / webhook / Sheets</small></div></div></div>",
  "css": ".diagram-flow{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.diagram-flow .diagram-col{display:flex;flex-direction:column;gap:10px}.diagram-flow .diagram-arrow{font-size:22px;line-height:1}.diagram-flow .center{display:flex;flex-direction:column;align-items:center;gap:4px}"
}
```

## Qué puedes hacer con él

- **Crea formularios de forma conversacional.** "Crea un formulario de contacto", "agrega una pregunta de puntuación NPS", "haz que el campo de correo electrónico sea obligatorio". El agente actualiza el esquema del formulario y las actualizaciones de vista previa desde el estado respaldado por SQL.
- **Ajuste visualmente.** Edite etiquetas, marcadores de posición, estados requeridos, opciones y orden de campos desde el generador UI cuando desee un control directo.
- **Utilice los tipos de campos enviados.** Los campos de texto, correo electrónico, número, texto largo, selección, selección múltiple, casilla de verificación, radio, fecha, calificación y escala se admiten desde el primer momento.
- **Recopilar respuestas.** Cada envío se almacena en SQL con una vista detallada por respuesta y un panel para revisar las entradas.
- **Enrutar envíos.** Envíe cargas útiles de envío a webhooks, Slack, Discord o Google Sheets mediante las integraciones integradas.
- **Publicar formularios públicos.** Comparta un formulario público URL y muestre un mensaje de agradecimiento después de enviarlo.

## Para empezar

Demostración en vivo: [forms.agent-native.com](https://forms.agent-native.com).

1. **Cree un formulario a partir de un mensaje.** Solicite el formulario que desee, incluido el
   audiencia y qué debería suceder después del envío.
2. **Refinar en el editor.** Ajustar etiquetas, validación, opciones y orden en
   el constructor visual cuando la edición directa es más rápida.
3. **Publica y comparte.** Utiliza el formulario público URL para los encuestados y luego mira
   Los resultados llegan a la vista Respuestas.
4. **Conectar destinos.** Dirigir nuevos envíos a Slack, Discord, Google
   Hojas, webhooks o su propio punto de extensión.

### Indicaciones útiles

- "Cree un formulario de registro beta con función, tamaño del equipo y caso de uso prioritario".
- "Agregue una pregunta NPS obligatoria y un seguimiento de texto libre."
- "Publica cada nueva respuesta en el canal del producto Slack."
- "Resuma los envíos de esta semana y agrúpelos por segmento de clientes."
- "Acorta este formulario sin perder los campos que necesitamos para el enrutamiento."

## Para desarrolladores

El resto de este documento es para cualquiera que bifurque la plantilla de Formularios o la amplíe.

### Inicio rápido

```bash
npx @agentnative-fork/core@latest create my-forms --standalone --template forms
cd my-forms
pnpm install
pnpm dev
```

Para un espacio de trabajo con Formularios junto con otras aplicaciones:

```bash
npx @agentnative-fork/core@latest create my-platform
```

Elija formularios y cualquier otra plantilla que desee durante la configuración del espacio de trabajo.

### Características clave {#key-features}

**Definiciones de formulario JSON.** Los campos se encuentran en una columna `fields` JSON, por lo que el agente puede realizar ediciones quirúrgicas sin cambios de esquema para cada tipo de campo.

**Páginas de relleno públicas.** Los encuestados pueden enviar formularios no autenticados, mientras que la configuración privada se elimina antes de que los datos lleguen al navegador.

**Destinos del lado del servidor.** Las integraciones de Slack, Discord, Google Sheets y webhooks se encuentran en la configuración del formulario y se ejecutan después del envío.

### Modelo de datos

Todos los datos residen en SQL a través de Drizzle ORM. Esquema: `templates/forms/server/db/schema.ts`. Los formularios llevan el estándar `ownableColumns` y una tabla de recursos compartidos de marco coincidente, por lo que encajan en el modelo de uso compartido por usuario/por organización.

| Tabla         | Qué contiene                                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `forms`       | Una definición de formulario: `title`, `description`, `slug` único, `fields` (matriz JSON de `FormField`), `settings` (JSON `FormSettings`), `status` (`draft` / `published` / `closed`), y una eliminación temporal de `deleted_at` |
| `responses`   | Un envío por fila: `form_id`, `data` (JSON `{ fieldId: value }`), `submitted_at`, `ip` y `submitter_email` opcionales                                                                                                                |
| `form_shares` | El marco comparte la tabla que asigna principales (usuarios u organizaciones) a roles (espectador, editor, administrador) por formulario                                                                                             |

Las formas `fields` y `settings` JSON están definidas en `templates/forms/shared/types.ts` (`FormField`, `FormSettings`). Las configuraciones privadas del propietario, como el webhook de integración URL y los orígenes permitidos, se eliminan antes de que los datos lleguen a la página de llenado público a través de `toPublicFormSettings`.

```an-schema title="Forms data model" summary="Three tables. Fields and integrations are JSON columns on forms, so the agent's edits are surgical patches rather than cross-table row changes."
{
  "entities": [
    {
      "id": "forms",
      "name": "forms",
      "note": "A form definition (ownable)",
      "fields": [
        { "name": "id", "type": "id", "pk": true },
        { "name": "title", "type": "string" },
        { "name": "description", "type": "string", "nullable": true },
        { "name": "slug", "type": "string", "note": "unique; public URL" },
        { "name": "fields", "type": "json", "note": "FormField[] — all field types" },
        { "name": "settings", "type": "json", "note": "FormSettings — integrations, etc." },
        { "name": "status", "type": "enum", "note": "draft | published | closed" },
        { "name": "deleted_at", "type": "datetime", "nullable": true, "note": "soft delete" },
        { "name": "owner_email", "type": "string" },
        { "name": "org_id", "type": "id", "nullable": true }
      ]
    },
    {
      "id": "responses",
      "name": "responses",
      "note": "One submission per row",
      "fields": [
        { "name": "id", "type": "id", "pk": true },
        { "name": "form_id", "type": "id", "fk": "forms.id" },
        { "name": "data", "type": "json", "note": "{ fieldId: value }" },
        { "name": "submitted_at", "type": "datetime" },
        { "name": "ip", "type": "string", "nullable": true },
        { "name": "submitter_email", "type": "string", "nullable": true }
      ]
    },
    {
      "id": "form_shares",
      "name": "form_shares",
      "note": "Framework shares table — principals to roles per form",
      "fields": [
        { "name": "id", "type": "id", "pk": true },
        { "name": "form_id", "type": "id", "fk": "forms.id" },
        { "name": "principal", "type": "string", "note": "user or org" },
        { "name": "role", "type": "enum", "note": "viewer | editor | admin" }
      ]
    }
  ],
  "relations": [
    { "from": "forms", "to": "responses", "kind": "1-n", "label": "has responses" },
    { "from": "forms", "to": "form_shares", "kind": "1-n", "label": "has share grants" }
  ]
}
```

### Clave actions

Cada operación es un archivo TypeScript en `templates/forms/actions/`, montado automáticamente en `POST /_agent-native/actions/:name`:

- `create-form`: crea un nuevo formulario (título, descripción, campos, configuración)
- `update-form`: actualizar campos, configuraciones o estado
- `get-form`: recuperar un formulario por id o slug
- `list-forms`: lista de formularios accesibles
- `delete-form`: eliminación temporal (establece `deleted_at`)
- `restore-form`: restaurar un formulario eliminado temporalmente
- `list-responses`: enumerar envíos para un formulario con filtros opcionales
- `export-responses`: exporta respuestas como CSV o JSON

### Personalizarlo

Pregunte primero al agente sobre el comportamiento del envío:

- "Agregue un campo de radio obligatorio para el método de contacto preferido."
- "Publique cada nuevo envío en Slack." Conecte Slack primero a través de [Messaging](/docs/messaging).
- "Agregar un destino de webhook para nuestro CRM."
- "Crea un formulario de comentarios de clientes con una escala del 1 al 10 y un seguimiento de texto largo".
- "Haga que algunos formularios sean públicos y otros solo para iniciar sesión."

Si necesita nuevas capacidades, como carga de archivos, firmas o widgets de campos personalizados, trátelos como extensiones de plantilla: agregue la forma SQL, los controles del editor actions, UI, la compatibilidad con el renderizador público y las instrucciones del agente. Consulte [Creating Templates](/docs/creating-templates) para conocer el patrón de compilación actual.

## ¿Qué sigue?

- [**Templates**](/docs/cloneable-saas): el modelo de clonar y poseer
- [**Actions**](/docs/actions): el sistema de acción que impulsa al constructor
- [**Messaging**](/docs/messaging) — Slack y otros destinos de envío
