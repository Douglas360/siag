BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_grupo_usuario] (
    [id_grupo] INT NOT NULL IDENTITY(1,1),
    [nome_grupo] NVARCHAR(1000) NOT NULL,
    [descricao_grupo] NVARCHAR(1000),
    CONSTRAINT [t_grupo_usuario_pkey] PRIMARY KEY CLUSTERED ([id_grupo])
);

-- CreateTable
CREATE TABLE [dbo].[t_usuario_grupo] (
    [id_usuario_grupo] INT NOT NULL IDENTITY(1,1),
    [id_grupo] INT NOT NULL,
    [id_usuario] INT NOT NULL,
    CONSTRAINT [t_usuario_grupo_pkey] PRIMARY KEY CLUSTERED ([id_usuario_grupo])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_grupo] ADD CONSTRAINT [t_usuario_grupo_id_usuario_fkey] FOREIGN KEY ([id_usuario]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_grupo] ADD CONSTRAINT [t_usuario_grupo_id_grupo_fkey] FOREIGN KEY ([id_grupo]) REFERENCES [dbo].[t_grupo_usuario]([id_grupo]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
