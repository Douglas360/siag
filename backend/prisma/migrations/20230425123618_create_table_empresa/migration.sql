/*
  Warnings:

  - Added the required column `id_empresa` to the `t_user` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[t_user] ADD [id_empresa] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[t_empresa] (
    [id_empresa] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [endereco] NVARCHAR(1000) NOT NULL,
    [cnpj] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [telefone] NVARCHAR(1000),
    [ativo] BIT NOT NULL CONSTRAINT [t_empresa_ativo_df] DEFAULT 0,
    [dt_criado] DATETIME2 NOT NULL CONSTRAINT [t_empresa_dt_criado_df] DEFAULT CURRENT_TIMESTAMP,
    [dt_atualizado] DATETIME2 NOT NULL,
    CONSTRAINT [t_empresa_pkey] PRIMARY KEY CLUSTERED ([id_empresa]),
    CONSTRAINT [t_empresa_nome_key] UNIQUE NONCLUSTERED ([nome]),
    CONSTRAINT [t_empresa_cnpj_key] UNIQUE NONCLUSTERED ([cnpj]),
    CONSTRAINT [t_empresa_email_key] UNIQUE NONCLUSTERED ([email])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_user] ADD CONSTRAINT [t_user_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
