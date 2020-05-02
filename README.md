# server

Tsuioku server Lambda function

### Development

```zsh
$ yarn install
```

Development deploy

```zsh
$ sls deploy
```

### Deployment

Production deploy

**Note: Production deploy is automated. DO NOT production deploy manually**

```zsh

$ sls deploy --stage prod
```

### Branch Control

#### master

- Hosted Branch
- CI/CD is installed here.

#### development

- development base. Create branch from this branch to develop features.
- **DO NOT develop on this branch**
