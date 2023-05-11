/*
  Warnings:

  - You are about to drop the `t_perfil_usuario` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[t_perfil_acesso_permissao] DROP CONSTRAINT [t_perfil_acesso_permissao_id_perfil_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[t_usuario_perfil] DROP CONSTRAINT [t_usuario_perfil_id_perfil_fkey];

-- DropTable
DROP TABLE [dbo].[t_perfil_usuario];

-- CreateTable
CREATE TABLE [dbo].[t_perfil_acesso] (
    [id_perfil] INT NOT NULL IDENTITY(1,1),
    [nome_perfil] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [t_perfil_acesso_pkey] PRIMARY KEY CLUSTERED ([id_perfil])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_perfil_acesso_permissao] ADD CONSTRAINT [t_perfil_acesso_permissao_id_perfil_fkey] FOREIGN KEY ([id_perfil]) REFERENCES [dbo].[t_perfil_acesso]([id_perfil]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_usuario_perfil] ADD CONSTRAINT [t_usuario_perfil_id_perfil_fkey] FOREIGN KEY ([id_perfil]) REFERENCES [dbo].[t_perfil_acesso]([id_perfil]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
