BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[t_documento_oficial] (
    [id_doc_oficial] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    [numero_documento] NVARCHAR(1000) NOT NULL,
    [tipo] NVARCHAR(1000) NOT NULL,
    [arquivo] NVARCHAR(1000) NOT NULL,
    [id_empresa] INT,
    [id_user] INT,
    [dt_criado] DATETIME2 NOT NULL CONSTRAINT [t_documento_oficial_dt_criado_df] DEFAULT CURRENT_TIMESTAMP,
    [dt_atualizado] DATETIME2,
    CONSTRAINT [t_documento_oficial_pkey] PRIMARY KEY CLUSTERED ([id_doc_oficial])
);

-- CreateTable
CREATE TABLE [dbo].[t_leitura] (
    [id_leitura] INT NOT NULL IDENTITY(1,1),
    [id_doc_oficial] INT NOT NULL,
    [id_user] INT NOT NULL,
    [dt_leitura] DATETIME2 NOT NULL CONSTRAINT [t_leitura_dt_leitura_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [t_leitura_pkey] PRIMARY KEY CLUSTERED ([id_leitura])
);

-- AddForeignKey
ALTER TABLE [dbo].[t_documento_oficial] ADD CONSTRAINT [t_documento_oficial_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_user]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_documento_oficial] ADD CONSTRAINT [t_documento_oficial_id_empresa_fkey] FOREIGN KEY ([id_empresa]) REFERENCES [dbo].[t_empresa]([id_empresa]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[t_leitura] ADD CONSTRAINT [t_leitura_id_user_fkey] FOREIGN KEY ([id_user]) REFERENCES [dbo].[t_user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[t_leitura] ADD CONSTRAINT [t_leitura_id_doc_oficial_fkey] FOREIGN KEY ([id_doc_oficial]) REFERENCES [dbo].[t_documento_oficial]([id_doc_oficial]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
