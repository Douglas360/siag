BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_cargo] (
    [id_cargo] INT NOT NULL IDENTITY(1,1),
    [id_empresa] INT NOT NULL,
    [nome_cargo] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [t_cargo_pkey] PRIMARY KEY CLUSTERED ([id_cargo])
);

-- CreateTable
CREATE TABLE [dbo].[t_usuario_cargo] (
    [id_usuario_cargo] INT NOT NULL IDENTITY(1,1),
    [id_cargo] INT NOT NULL,
    [id_usuario] INT NOT NULL,
    CONSTRAINT [t_usuario_cargo_pkey] PRIMARY KEY CLUSTERED ([id_usuario_cargo])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_cargo] ADD CONSTRAINT [t_cargo_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_cargo] ADD CONSTRAINT [t_usuario_cargo_id_usuario_fkey] FOREIGN KEY ([id_usuario]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_cargo] ADD CONSTRAINT [t_usuario_cargo_id_cargo_fkey] FOREIGN KEY ([id_cargo]) REFERENCES [dbo].[t_cargo]([id_cargo]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
