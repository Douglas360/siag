BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_perfil_usuario] (
    [id_perfil] INT NOT NULL IDENTITY(1,1),
    [nome_perfil] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [t_perfil_usuario_pkey] PRIMARY KEY CLUSTERED ([id_perfil])
);

-- CreateTable
CREATE TABLE [dbo].[t_modulo] (
    [id_modulo] INT NOT NULL IDENTITY(1,1),
    [nome_modulo] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [t_modulo_pkey] PRIMARY KEY CLUSTERED ([id_modulo])
);

-- CreateTable
CREATE TABLE [dbo].[t_permissao] (
    [id_permissao] INT NOT NULL IDENTITY(1,1),
    [nome_permissao] NVARCHAR(1000) NOT NULL,
    [id_modulo] INT,
    CONSTRAINT [t_permissao_pkey] PRIMARY KEY CLUSTERED ([id_permissao])
);

-- CreateTable
CREATE TABLE [dbo].[t_perfil_acesso_permissao] (
    [id_perfil_permissao] INT NOT NULL IDENTITY(1,1),
    [id_perfil] INT NOT NULL,
    [id_permissao] INT NOT NULL,
    [canEdit] BIT NOT NULL CONSTRAINT [t_perfil_acesso_permissao_canEdit_df] DEFAULT 1,
    CONSTRAINT [t_perfil_acesso_permissao_pkey] PRIMARY KEY CLUSTERED ([id_perfil_permissao])
);

-- CreateTable
CREATE TABLE [dbo].[t_usuario_perfil] (
    [id_usuario_perfil] INT NOT NULL IDENTITY(1,1),
    [id_perfil] INT NOT NULL,
    [id_usuario] INT NOT NULL,
    CONSTRAINT [t_usuario_perfil_pkey] PRIMARY KEY CLUSTERED ([id_usuario_perfil])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_permissao] ADD CONSTRAINT [t_permissao_id_modulo_fkey] FOREIGN KEY ([id_modulo]) REFERENCES [dbo].[t_modulo]([id_modulo]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_perfil_acesso_permissao] ADD CONSTRAINT [t_perfil_acesso_permissao_id_perfil_fkey] FOREIGN KEY ([id_perfil]) REFERENCES [dbo].[t_perfil_usuario]([id_perfil]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_perfil_acesso_permissao] ADD CONSTRAINT [t_perfil_acesso_permissao_id_permissao_fkey] FOREIGN KEY ([id_permissao]) REFERENCES [dbo].[t_permissao]([id_permissao]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_perfil] ADD CONSTRAINT [t_usuario_perfil_id_usuario_fkey] FOREIGN KEY ([id_usuario]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_perfil] ADD CONSTRAINT [t_usuario_perfil_id_perfil_fkey] FOREIGN KEY ([id_perfil]) REFERENCES [dbo].[t_perfil_usuario]([id_perfil]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
